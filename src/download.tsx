import React from "react";
import TorrentResult from "./components/TorrentResult";
import { Torrent } from "./scraper/torrent-scraper";
import { downloadTorrent } from "./scraper/download-torrent";

const Download = ({torrent} : {torrent: Torrent}) => {

    const cachePath = "./cache";

    downloadTorrent(torrent.magnet, cachePath).then((path) => {
        console.log(path)
    })
    return (
        <TorrentResult torrent={torrent} flag={true} />
    )
}

export default Download;