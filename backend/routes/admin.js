const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const adminAuth = require("../middleware/adminAuth");


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(
            null,
            path.join(__dirname, "../../policies")
        );
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});

const upload = multer({
    storage: storage
});


router.get("/documents", adminAuth, (req, res) => {

    res.json({
        message: "Admin access working"
    });

});


router.post(
    "/upload",
    adminAuth,
    upload.single("policyFile"),

    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                message: "No file uploaded"
            });

        }

        res.json({
            message: "Policy uploaded successfully",
            file: req.file.originalname
        });

    }

);


module.exports = router;