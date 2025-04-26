import React, { useEffect, useState } from "react";
import TorrentResult from "./components/TorrentResult";
import { FetchedTorrent } from "./scraper/torrent-scraper";
import { downloadTorrent } from "./scraper/download-torrent";
import TorrentStatus from "./components/loading/TorrentStatus";
import { Box } from "ink";
import { Torrent } from "webtorrent";
import UploadTorrent from "./upload";

export const cachePath = "./cache";


const Download = ({torrent: fetchedTorrent} : {torrent: FetchedTorrent}) => {
    const [webTorrent, setWebTorrent] = useState<Torrent | null>(null);
    const [torrentPath, setTorrentPath] = useState<string>("");


    useEffect(() => {
        const { ready, done } = downloadTorrent(fetchedTorrent.magnet, cachePath);
        ready.then(torrent => {
            setWebTorrent(torrent);
            // Already found in cache
            if(torrent.progress >= 1) {
                console.log('Torrent already cached')
                setTorrentPath(`${cachePath}/${torrent.name}`);
            }
        })
        done.then(torrentPath => {
            setTorrentPath(torrentPath)
            console.log(`Download at: ${torrentPath}`)
        })
    }, [fetchedTorrent.magnet]) // Only re-render if torrent magnet changed, impossible

    return (
        <Box>
            {!torrentPath && 
                // Torrent to download 
                <TorrentResult torrent={fetchedTorrent} flag={true} />
                // Torrent download progress
                && webTorrent && <TorrentStatus torrent={webTorrent} /> 
            }
            {torrentPath && webTorrent &&
                <UploadTorrent torrent={webTorrent}/>
            }
        </Box>
    )
}

export default Download;