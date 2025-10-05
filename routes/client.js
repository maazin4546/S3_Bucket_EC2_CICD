const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client");
// const upload = require("../middleware/multer");
const uploadToS3 = require("../middleware/s3Multer");

// router.post("/register", upload.single("profilePicture"), clientController.register);
router.post("/register", uploadToS3.single("profilePicture"), clientController.register);
router.get("/list", clientController.getAllClients);

module.exports = router;