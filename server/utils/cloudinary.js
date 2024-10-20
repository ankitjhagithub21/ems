const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
const uploadImage = async (localFilePath) => {
    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        fs.unlinkSync(localFilePath);  // Delete local file after upload
        return { secureUrl: result.secure_url, publicId: result.public_id };
    } catch (error) {
        fs.unlinkSync(localFilePath);  // Cleanup on failure
        console.error('Cloudinary Upload Error:', error);
        return null;
    }
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary Deletion Error:', error);
    }
};

module.exports = { uploadImage, deleteImage };
