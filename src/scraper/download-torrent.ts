import WebTorrent, { Torrent } from 'webtorrent';  // Import the webtorrent package

export interface DownloadHandle {
  /** resolves with the Torrent instance as soon as it’s added */
  ready: Promise<Torrent>;
  /** resolves with the download folder path once the torrent is done */
  done: Promise<string>;
}


/**
 * Kick off a torrent download, but give you back two promises:
 *  - ready  (fires immediately after client.add)
 *  - done   (fires after the download completes)
 */
export function downloadTorrent(
  magnet: string,
  cachePath: string
): DownloadHandle {
  const client = new WebTorrent({utp: false});

  const ready = new Promise<Torrent>((resolve, reject) => {
    client.add(magnet, { path: cachePath }, (torrent) => {
      resolve(torrent);
    });
    client.on('error', reject);
  });

  const done = ready.then(
    (torrent) =>
      new Promise<string>((resolve, reject) => {
        torrent.on('done', () => {
          console.log('done')
          resolve(`${torrent.path}/${torrent.name}`)
        });
        torrent.on('error', reject);
      })
  );

  return { ready, done };
}