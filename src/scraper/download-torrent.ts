import WebTorrent from 'webtorrent';  // Import the webtorrent package


// Define a function to download the torrent locally
export const downloadTorrent = (magnet: string, cachePath: string): Promise<void> => {
    const client = new WebTorrent();
  
    console.log('Start downloading the torrent...');
  
    return new Promise<void>((resolve, reject) => {
      // Add the torrent using the magnet link
      client.add(magnet, { path: cachePath }, (torrent) => {
        console.log(`Torrent added: ${torrent.infoHash}`);
  
        torrent.on('done', () => {
          console.log('Torrent download complete!');
          resolve();  // Resolve when the torrent is fully downloaded
        });
  
        torrent.on('error', (err) => {
          console.error('Error downloading torrent:', err);
          reject(err);  // Reject the promise if an error occurs
        });
      });
    });
  };
  