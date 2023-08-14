
const express = require("express");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var router = express.Router();
const convertor =require('../Controller/HtMLToPDF.Controller')
const Convert = require('../Controller/TextConvertor.Controller')

router.post('/convert-to-pdf', convertor.convertor);
router.get('/convert-to-text',Convert.convertor)

module.exports = router;