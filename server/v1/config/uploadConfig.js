import multer from 'multer';


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const filter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype === 'image/jpeg' || mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: filter,
});

export default upload;
