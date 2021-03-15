const csvtojson = require("csvtojson");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");

const readableStream = fs.createReadStream(
  path.join(__dirname, "./csv/nodejs-hw1-ex1.csv")
);

const writeStream = fs.createWriteStream(
  path.join(__dirname, "./nodejs-hw1-ex1.txt")
);

pipeline(readableStream, csvtojson(), writeStream, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Successfully converted");
});
