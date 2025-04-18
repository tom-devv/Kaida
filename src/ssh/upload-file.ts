import { Client } from "ssh2";
import fs from 'fs';
import path from 'path';

export const uploadFile = (sftpClient: Client, cachePath: string, remotePath: string) => {
  console.log(`Uploading from cache: ${cachePath}`);

  sftpClient.sftp((err, sftp) => {
    if (err) {
      console.error('Error opening SFTP session:', err);
      return;
    }

    console.log("Established sftp ")

    // Read all files in the cache directory
    fs.readdir(cachePath, (err, files) => {
      if (err) {
        console.error('Error reading cache directory:', err);
        sftpClient.end();  // End the session if error reading the directory
        return;
      }

      let filesUploaded = 0;
      const totalFiles = files.length;

      // Loop over all files in the cache folder and upload them
      files.forEach((file) => {
        console.log('Cached file: ' + file)
        const localFilePath = path.join(cachePath, file);
        const remoteFilePath = path.join(remotePath, file);

        // Create a writable stream to upload the file to the SFTP server
        const writeStream = sftp.createWriteStream(remoteFilePath);

        // Create a readable stream from the local file and pipe it to the SFTP write stream
        fs.createReadStream(localFilePath).pipe(writeStream);

        writeStream.on('close', () => {
          console.log(`File ${file} uploaded successfully!`);
          filesUploaded++;

          // If all files have been uploaded, end the connection
          if (filesUploaded === totalFiles) {
            console.log("All files uploaded successfully.");
            sftpClient.end();  // End the connection after uploading all files
          }
        });

        writeStream.on('error', (err: Error) => {
          console.error(`Error uploading file ${file}:`, err);
        });
      });
    });
  });
};
