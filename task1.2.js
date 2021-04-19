/* eslint-disable no-console */
import csvtojson from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

const readableStream = fs.createReadStream(
  path.join(__dirname, './csv/nodejs-hw1-ex1.csv'),
);

const writeStream = fs.createWriteStream(
  path.join(__dirname, './nodejs-hw1-ex1.txt'),
);

pipeline(readableStream, csvtojson(), writeStream, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log('Successfully converted');
});
