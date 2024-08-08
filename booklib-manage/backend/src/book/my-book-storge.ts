import * as multer from 'multer';
import * as fs from 'node:fs';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `uploads`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix);
  },
});
