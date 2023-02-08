'use strict';

const multer = require('multer');
const moment = require('moment');
const fs = require('fs');

class UploadUtil {
  constructor(path) {
    this.path = path;
    this.multer = multer;
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = this.path;
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname);
    },
  });
}

module.exports = UploadUtil;
