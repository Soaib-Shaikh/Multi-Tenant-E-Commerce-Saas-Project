import cloudinary from "../configs/cloudinary.js";
import { Readable } from "stream";

export const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};