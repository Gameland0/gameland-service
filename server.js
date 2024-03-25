import express from 'express';
import cors from 'cors';
import formidable from 'formidable'
import { create } from '@web3-storage/w3up-client';
import bodyParser from "body-parser";
import fs from 'fs'

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000","https://testnet.gameland.network","https://gameland.network","https://dapp.gameland.network"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json({limit:'900mb'}))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const web3Storage_upload = async (file) => {
  const client = await create()
  const fileCid = await client.uploadFile(file)
  return fileCid
}


app.post("/upload", (req, res) => {
  let info = {};
  const option = {
    maxFileSize: 900 * 1024 * 1024
  }
  const form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.parse(req, function (error, fields, files) {
    if (error) {
      info.status = 0;
      info.message = error.message;
      res.send(info);
    }
    console.log(files.files.filepath)
    fs.readFile(files.files.filepath, async (err, data) => {
      if (err) {
        callback(err);
      } else {
        const blob = new Blob([data],{type: files.files.mimetype});
        const cid = await web3Storage_upload(blob)
        if (cid) {
          res.send({
            code: 1,
            CID: cid
          });
        }
      }
    });
    res.send({
      code: 1,
    });
  });
});


// set port, listen for requests
const PORT = 8111;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});