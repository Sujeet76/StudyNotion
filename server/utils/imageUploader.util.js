import { v2 as cloudinary } from "cloudinary";
import { CLOUD_FOLDER, CLOUD_VIDEO_FOLDER } from "../config/index.js";

// image
const uploadToCloudinary = async (file, folder, height, quality) => {
  const option = { folder };
  if (height) option.height = height;
  if (quality) option.quality = quality;
  option.resourceType = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, option);
};
export default uploadToCloudinary;

// larger video more then 100mb
export const uploadVideoToCloudinary = async (
  file,
  folder = CLOUD_VIDEO_FOLDER
) => {
  try {
    const option = { folder, resource_type: "video" };
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        file.tempFilePath,
        option,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// to delete image
export const deleteToCloudinary = (
  file,
  folder = CLOUD_FOLDER,
  type = "image"
) => {
  cloudinary.api
    .delete_resources([`${folder}/${file}`], {
      type: "upload",
      resource_type: type,
    })
    .then(console.log)
    .catch((error) => console.log(error));
};
