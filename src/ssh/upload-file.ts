import * as path from "path";
import fs from 'fs-extra';
import SftpClient from "ssh2-sftp-client";
import { establishSFTPConnection } from "./sftp-connection";


async function ensureRemoteDirExists(sftp: SftpClient, remoteFolder: string) {
  console.log('something 1')
  const dirExists = await sftp.exists(remoteFolder);
  console.log('something')
  if (!dirExists) {
      console.log(`Creating remote folder: ${remoteFolder}`);
      await sftp.mkdir(remoteFolder, true); // Recursive create
  } else {
      console.log(`Remote folder ${remoteFolder} already exists.`);
  }
}

export async function uploadFolderToSftp(localFolder: string, remoteFolder: string) {

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
              await sftp.put(localFilePath, remoteFilePath);
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