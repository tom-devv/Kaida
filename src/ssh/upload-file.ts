import * as path from "path";
import fs from 'fs-extra';
import SftpClient from "ssh2-sftp-client";
import { establishSFTPConnection } from "./sftp-connection";


async function ensureRemoteDirExists(sftp: SftpClient, remoteFolder: string) {
  const dirExists = await sftp.exists(remoteFolder);
  if (!dirExists) {
      console.log(`Creating remote folder: ${remoteFolder}`);
      await sftp.mkdir(remoteFolder, true); // Recursive create
  } else {
      console.log(`Remote folder ${remoteFolder} already exists.`);
  }
}

export async function uploadFolderToSftp(
    localFolder: string,
    remoteFolder: string,
    onProgress?: (file: string, pct: number) => void
) {

  const sftp = await establishSFTPConnection();
    try {
      // Ensure the remote folder exists
      await ensureRemoteDirExists(sftp, remoteFolder);

      // Get the list of files in the local folder
      const files = await fs.readdir(localFolder);

      for (const file of files) {
          const localFilePath = path.join(localFolder, file);
          const remoteFilePath = path.join(remoteFolder, file);

          const stats = await fs.stat(localFilePath);

          if (stats.isDirectory()) {
              // Recursively upload subfolders
              await uploadFolderToSftp(localFilePath, remoteFilePath);
          } else {
              // Upload file
              console.log(`Uploading ${localFilePath} to ${remoteFilePath}`);
              await sftp.fastPut(localFilePath, remoteFilePath, {
                    step(totalTransferred, _, total) {
                        if(onProgress) {
                            onProgress(remoteFilePath, (totalTransferred / total ) * 100)
                        }
                    },
              });
          }
      }
      console.log("All files uploaded successfully.");
  } catch (err) {
      console.error("Error uploading files:", err);
  } finally {
      // Close the SFTP connection
      await sftp.end();
  }
}

// async function uploadWithProgress(
//     sftp: SftpClient,
//     local: string,
//     remote: string,
//     onProgress: (pct: number) => void
//   ) {
//     const { size: total } = await stat(local);
//     let transferred = 0;
  
//     return new Promise<void>((resolve, reject) => {
//       const rs = createReadStream(local);
//       const ws = sftp.createWriteStream(remote);
  
//       rs.on("data", (chunk: Buffer) => {
//         transferred += chunk.length;
//         onProgress((transferred / total) * 100);
//       });
  
//       ws.on("finish", () => resolve());
//       rs.on("error", reject);
//       ws.on("error", reject);
  
//       rs.pipe(ws);
//     });
//   }