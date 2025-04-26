import React from "react"
import { Box, Text } from "ink"
import { FetchedTorrent } from "../scraper/torrent-scraper"

const MAX_TITLE_LENGTH = 60;

const truncate = (str: string, max: number) => {
	const clean = str.replace(/\s+/g, ' ').trim();
	return clean.length > max ? clean.slice(0, max - 3) + '...' : clean;
};

const TorrentResult = ({
    torrent,
    flag,
    index}: {
        torrent: FetchedTorrent,
        flag: boolean,
        index?: number
    }) => {
    return (
        <Box
            flexDirection="column"
            borderStyle="round"
borderColor={flag ? 'green' : 'gray'}
            paddingX={1}
            width="50%"
        >
                <Text color={flag ? 'green' : 'cyan'}>
                    {index ? `${index + 1}. 📁 ` : ''}
                    {truncate(torrent.name, MAX_TITLE_LENGTH)}
                </Text>
            <Text>
                📦 {torrent.size}   📅 {torrent.date}
            </Text>
            <Text>
                🌱 Seeds: {torrent.seeds}
            </Text>
        </Box>
    )
}

export default TorrentResult;