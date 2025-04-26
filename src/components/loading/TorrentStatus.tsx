// components/TorrentStatus.tsx
import React, {useState, useEffect} from 'react';
import {Box, Text} from 'ink';
import Loader from './Loader';
import { Torrent } from 'webtorrent';

// Helper to format bytes → MiB
function formatMiB(bytes: number) {
  return (bytes / (1024 ** 2)).toFixed(2) + ' MiB';
}

// Helper to format seconds → HH:MM:SS
function formatTime(sec: number) {
  const h = Math.floor(sec / 3600).toString().padStart(2,'0');
  const m = Math.floor((sec % 3600) / 60).toString().padStart(2,'0');
  const s = Math.floor(sec % 60).toString().padStart(2,'0');
  return `${h}:${m}:${s}`;
}


const TorrentStatus = ({torrent} : {torrent: Torrent}) => {
  const [progress, setProgress]     = useState(0);
  const [downloaded, setDownloaded] = useState(0);
  const [speed, setSpeed]           = useState(0);
  const [eta, setEta]               = useState(0);

  useEffect(() => {
    const onDownload = () => {
      setProgress(torrent.progress);
      setDownloaded(torrent.downloaded);
      setSpeed(torrent.downloadSpeed);
      // avoid divide‑by‑zero
      setEta(torrent.downloadSpeed
        ? (torrent.length - torrent.downloaded) / torrent.downloadSpeed
        : 0
      );
    };

    torrent.on('download', onDownload);
    torrent.on('done',   onDownload);
    return () => {
      torrent.off('download', onDownload);
      torrent.off('done',   onDownload);
    };
  }, [torrent]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box>
        <Text><Loader pretext={''} /> </Text>
        <Text>
          {progress < 1 ? 'Downloading' : 'Completed'}{' '}
          {progress >= 1 ? '✅' : ''}
        </Text>
      </Box>

      <Box>
        <Text>Progress: {Math.round(progress * 100)}%</Text>
      </Box>

      <Box>
        <Text>
          {formatMiB(downloaded)} / {formatMiB(torrent.length)}
        </Text>
      </Box>

      <Box>
        <Text>Speed: {(speed / 1024).toFixed(2)} KiB/s</Text>
      </Box>

      <Box>
        <Text>ETA: {formatTime(eta)}</Text>
      </Box>
    </Box>
  );
};

export default TorrentStatus;
