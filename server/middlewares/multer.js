const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp');  // Store temporarily before Cloudinary upload
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // Prevent duplicate filenames
    }
});


const upload = multer({ storage });

module.exports = upload;
