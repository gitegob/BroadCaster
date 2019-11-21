import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (file) => {
  try {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      const image = await cloudinary.uploader.upload(file.tempFilePath, (result) => result);
      return image;
    }
  } catch (e) {
    e.message = 'Media upload failed, Try again';
    throw e;
  }
};

export default upload;
