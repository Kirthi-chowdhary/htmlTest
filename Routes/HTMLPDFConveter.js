
const express = require("express");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
var router = express.Router();
var multer = require("multer");

const upload = multer();
app.use(upload.any());
const convertor =require('../Controller/HtMLToPDF.Controller')
const Convert = require('../Controller/TextConvertor.Controller')
const upl = require('../Controller/DocUploader.Controller')

router.post('/convert-to-pdf', convertor.convertor);
router.get('/convert-to-text',Convert.convertor)
router.post('/upload', upload.single('file'), upl.Uploader);

module.exports = router;