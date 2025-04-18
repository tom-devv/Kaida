import React from "react";
import TorrentResult from "./components/TorrentResult";
import { Torrent } from "./scraper/torrent-scraper";

const Download = ({torrent} : {torrent: Torrent}) => {
    return (
        <TorrentResult torrent={torrent} flag={true} />
    )
}

export default Download;