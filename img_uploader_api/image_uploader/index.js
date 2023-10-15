var express = require('express');
var router = express.Router();
const multer = require("multer");


router.get('/', (req, res) => {
    res.status(200).json({ "message": "IMAGE UPLOADING API CHECK" })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});


const upload = multer({
    storage: storage,
});

router.post('/image-uploader', upload.any('file'), (req, res) => {
    if (!req.file) {
        res.status(200).json({message: "success"})
    }else{
        res.status(200).json({message: "error"})
    }
    
})
module.exports = router