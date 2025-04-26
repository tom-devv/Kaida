import { Box, Text } from "ink"
import React, { useEffect, useRef } from "react"
import { uploadFolderToSftp } from "./ssh/upload-file"
import { Torrent } from "webtorrent"
import { cachePath } from "./download"
import Loader from "./components/loading/Loader"
import LoadingBar, { LoadingBarHandle } from "./components/loading/LoadingBar"

const uploadPath = "/mnt/drive/plex"

const UploadTorrent = ({torrent} : { torrent: Torrent}) => {


    const barRef = useRef<LoadingBarHandle>(null);

    useEffect(() => {
        
        barRef.current?.setProgress(0);

        uploadFolderToSftp(cachePath, `${uploadPath}/${torrent.name}` , (_file, pct) => {
            barRef.current?.setProgress(pct);
        }).then(() => {
            barRef.current?.setProgress(100);
            console.log('Upload complete')
        })
    }, [cachePath])

    return (
        <Box borderStyle="round">
            <Text>Uploading Media </Text>
            <Loader />
            <LoadingBar ref={barRef} width={40} />
        </Box>
    )
}

export default UploadTorrent;