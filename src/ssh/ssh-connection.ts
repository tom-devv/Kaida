import { Client } from 'ssh2'; // Import the SSH2 client
import fs from 'fs';

export const establishSFTPConnection = (callback: () => void) => {

    const sshClient = new Client();

    sshClient.on('ready', () => {
        console.log('SSH Connection established');
        callback()
    });

    sshClient.connect({
        host: process.env.HOST,          // Use the environment variable
        port: Number(process.env.PORT),  // Port should be a number
        username: process.env.USERNAME,  // Use the environment variable
        privateKey: fs.readFileSync(process.env.PRIVATE_KEY_PATH!), // Path to private key
      });

    return sshClient;
};