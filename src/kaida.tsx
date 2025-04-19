#!/usr/bin/env node
import dotenv from 'dotenv';
import { downloadTorrent } from './scraper/download-torrent';



dotenv.config();

// uploadFolderToSftp("./cache", "/home/tom/kaida");
    const cachePath = "./cache";
    const mag = "magnet:?xt=urn:btih:293E47A94F6DA51D482EBF77F2B23128F56137BF&dn=Black%20Mirror%20S07E01%201080p%20WEB%20h264-ETHEL&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce"

    downloadTorrent(mag, cachePath).then((path) => {
        console.log(path)
    })

// import './cli'
