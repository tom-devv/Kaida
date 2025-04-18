import React from "react";
import TorrentResult from "./components/TorrentResult";
import { Torrent } from "./scraper/torrent-scraper";
import { establishSFTPConnection } from "./ssh/ssh-connection";

const Download = ({torrent} : {torrent: Torrent}) => {
    const sftpConnection = establishSFTPConnection((file) => {

    })
    return (
        <TorrentResult torrent={torrent} flag={true} />
    )
}

export default Download;