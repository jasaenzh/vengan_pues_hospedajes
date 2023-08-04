import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${fileExtension}`);
  }
})

export const upload = multer({ storage });