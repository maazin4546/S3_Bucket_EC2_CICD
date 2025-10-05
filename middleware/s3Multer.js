const multer = require("multer");
const multerS3 = require("multer-s3-v3");
const s3Client = require("../config/s3");
const path = require("path");

const uploadToS3 = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileName = `profilePicture/${Date.now()}_${path.basename(file.originalname)}`;
            cb(null, fileName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
        }
    },
});

module.exports = uploadToS3;
