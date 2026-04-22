const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const adminAuth = require("../middleware/adminAuth");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../policies"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});

const upload = multer({
    storage: storage
});


router.get("/documents", adminAuth, (req, res) => {

    const folderPath =
        path.join(__dirname, "../../policies");

    const files =
        fs.readdirSync(folderPath);

    const documents = [];


    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const filePath = path.join(folderPath, fileName);
        const stats = fs.statSync(filePath);
        let policyName = "";
        let insurer = "";

        if (fileName.endsWith(".json")) {
            const fileData = fs.readFileSync(filePath, "utf-8");
            const policy = JSON.parse(fileData);
            policyName = policy.policyName;
            insurer = policy.insurer;
        }

        documents.push({
            fileName: fileName,
            uploadDate: stats.birthtime,
            fileType: path.extname(fileName),
            policyName: policyName,
            insurer: insurer
        });
    }
    res.json(documents);

});


router.post("/upload", adminAuth, upload.single("policyFile"), (req, res) => {
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

router.put("/document/:fileName", adminAuth, (req, res) => {

    const fileName = req.params.fileName;

    const filePath =
        path.join(__dirname, "../../policies", fileName);


    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            message: "Document not found"
        });
    }


    if (!fileName.endsWith(".json")) {
        return res.status(400).json({
            message: "Only JSON metadata can be edited"
        });
    }


    const fileData =
        fs.readFileSync(filePath, "utf-8");

    const policy =
        JSON.parse(fileData);


    if (req.body.policyName) {
        policy.policyName =
            req.body.policyName;
    }

    if (req.body.insurer) {
        policy.insurer =
            req.body.insurer;
    }


    fs.writeFileSync(
        filePath,
        JSON.stringify(policy, null, 2)
    );


    res.json({
        message: "Policy metadata updated",
        policy: policy
    });

});


module.exports = router;