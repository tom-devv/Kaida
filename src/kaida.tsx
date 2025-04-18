#!/usr/bin/env node
import dotenv from 'dotenv';
import { establishSFTPConnection } from './ssh/ssh-connection';
import { uploadFile } from './ssh/upload-file';

dotenv.config();

const client = establishSFTPConnection(() => {
    uploadFile(client, "./", "/home/tom")

});


// import './cli'
