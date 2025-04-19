import fs from 'fs';
import SftpClient from 'ssh2-sftp-client';

export async function establishSFTPConnection(): Promise<SftpClient> {
  const sftp = new SftpClient();


    await sftp.connect({
      host:        process.env.HOST!,
      port:        Number(process.env.PORT),
      username:    process.env.USERNAME!,
      privateKey:  fs.readFileSync(process.env.PRIVATE_KEY_PATH!),
    });

    return sftp;
}
