import React from 'react';
import { Box, Text } from 'ink';

type Torrent = {
  name: string;
  magnet: string;
  size: string;
  date: string;
};

const Results = ({ torrents }: { torrents: Torrent[] }) => (
  <Box flexDirection="column" marginTop={1}>
    {torrents.map((torrent, index) => (
      <Box key={index} flexDirection="column" paddingBottom={1}>
        <Text>
          <Text color="cyan">📁 {torrent.name}</Text>
        </Text>
        <Text>📦 Size: {torrent.size}</Text>
        <Text>📅 Uploaded: {torrent.date}</Text>
        {/* <Text>🔗 Magnet: {torrent.magnet}</Text> */}
      </Box>
    ))}
  </Box>
);

export default Results;
