// global.d.ts
import 'webtorrent';

declare module 'webtorrent' {
  interface Torrent {
    /** total size of all files in bytes */
    size: number;
  }
}
