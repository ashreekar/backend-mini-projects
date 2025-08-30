import fs from "fs";
import cloudinary from "cloudinary";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOncloudinary=async(localfilepath)=>{
    try {
        // if local path not present
        if (!localfilepath) return null;

        // uploading on cloudinary as our file
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto",
            folder:""
        });
        // file has been uploaded sucessfully
        console.log("✅ File uploaded securely 🌐", response.url);
        fs.unlinkSync(localfilepath);
        return response;

    } catch (err) {
        fs.unlinkSync(localfilepath);//removes the locally saved temp file as the upload operation failed
        return null;
    }
}

const deleteCloudinary=async(fileUrl)=>{
     try {
        if (!fileUrl) return null;

        // remove query params if any
        const cleanUrl = fileUrl.split("?")[0];

        // take the part after /upload/
        const parts = cleanUrl.split("/upload/")[1];

        // remove the version number (starts with 'v123...')
        const withoutVersion = parts.substring(parts.indexOf("/") + 1);

        // strip extension (.jpg, .png, etc.)
        const publicId = withoutVersion.replace(/\.[^/.]+$/, "");

        const deletedKey = await cloudinary.uploader.destroy(publicId);
        console.log("✅ File deleted securely 🌐", deletedKey);
        return deletedKey;

    } catch (err) {
        console.error("❌ Error deleting file from Cloudinary:", err);
        return null;
    }
}

export {uploadOncloudinary,deleteCloudinary};