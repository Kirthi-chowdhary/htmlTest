
const express = require("express");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var router = express.Router();
const convertor =require('../Controller/HtMLToPDF.Controller')

router.post('/convert-to-pdf', convertor.convertor);

module.exports = router;