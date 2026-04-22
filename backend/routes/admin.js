const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

router.get("/documents", adminAuth, (req, res) => {

    res.json({
        message: "Admin access working"
    });

});

module.exports = router;