const cloudinary = require("cloudinary").v2;
// here we are using the version v2 of cloudinary
const multer = require("multer");

// so we need to do three thinks 
// 1) configure the cloudinary with our credentials and  second one is 
// 2) we have to create the storage for the multer to store the image in the memory storage and 
// 3) we have to create the imageUploadUtil function to upload the image to the cloudinary and return the result to the user. 
cloudinary.config({
  cloud_name: "dmwmdonoz",
  api_key: "657139533131885",
  api_secret: "7Hcnr-GNrzWb2VRMEnrY374QxFY",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };