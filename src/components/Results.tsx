import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { FetchedTorrent } from '../scraper/torrent-scraper';
import TorrentResult from './TorrentResult';

const chunk = <T,>(arr: T[], size: number): T[][] =>
	Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size)
	);

const Results = ({ 
  torrents, 
  onSelect,
  }: {
    torrents: FetchedTorrent[];
    onSelect: (torrent: FetchedTorrent) => void  
  }) => {
	const COLUMNS = 2;
	const rows = chunk(torrents, COLUMNS);


  // Track selected torrent from the grid
  const [selected, setSelected] = useState(0);
  const total = torrents.length;

  useInput((input, key) => {
		if (key.leftArrow) {
			setSelected((prev) => (prev - 1 + total) % total);
		} else if (key.rightArrow) {
			setSelected((prev) => (prev + 1) % total);
		} else if (key.upArrow) {
			setSelected((prev) => (prev - COLUMNS + total) % total);
		} else if (key.downArrow) {
			setSelected((prev) => (prev + COLUMNS) % total);
		} else if (key.return) {
			onSelect?.(torrents[selected]);
		} 
	});

	return (
		<Box flexDirection="column" marginTop={1}>
			{rows.map((row, rowIndex) => (
				<Box key={rowIndex} flexDirection="row" gap={2} marginBottom={1}>
					{row.map((torrent, index) => {
            const flatIndex = rowIndex * COLUMNS + index;
            const isSelected = selected === flatIndex;
            return (
						<TorrentResult
              key={index}
              torrent={torrent} 
              flag={isSelected} 
              index={flatIndex} 
              />
            )
          })}
				</Box>
			))}
		</Box>
	);
};

export default Results;
