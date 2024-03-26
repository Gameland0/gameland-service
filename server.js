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
  return fileCid.toString()
}


app.post("/upload", (req, res) => {
  let info = {};
  const option = {
    maxFileSize: 1 * 1024 * 1024 * 1024
  }
  const form = new formidable.IncomingForm(option);
  form.encoding = "utf-8";
  form.parse(req, function (error, fields, files) {
    if (error) {
      info.status = 0;
      info.message = error.message;
      res.send(info);
    }
    fs.readFile(files.files.filepath, async (err, data) => {
      if (err) {
        res.send(err);
      } else {
        const blob = new Blob([data],{type: files.files.mimetype});
        try {
          const cid = await web3Storage_upload(blob)
          if (cid) {
            res.send({
              code: 1,
              CID: cid
            });
          }
        } catch (error) {
          res.send({
            code: 0,
            message: error.message
          });
        }
      }
    });
  });
});


// set port, listen for requests
const PORT = 8111;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});