import path from 'path';
import WebTorrent from 'webtorrent';  // Import the webtorrent package


// Define a function to download the torrent locally
export const downloadTorrent = (magnet: string, cachePath: string): Promise<string> => {
    const client = new WebTorrent();
  
    console.log('Start downloading the torrent...');
  
    return new Promise<string>(() => {
      // Add the torrent using the magnet link
      client.add(magnet, { path: cachePath }, (torrent) => {
        console.log(`Torrent added: ${torrent.infoHash}`);
        console.log(`Torrent Size: ${torrent.timeRemaining}`)
  
        torrent.on('done', () => {
          return torrent.path;
        });

        torrent.on('metadata', () => {
          const bytesPergb = 1024 ** 3;
          console.log(`Size: ${torrent.length / bytesPergb}`)
        })
  
        torrent.on('error', (err) => {
          console.error('Error downloading torrent:', err);
        });
      });
    });
  };
  