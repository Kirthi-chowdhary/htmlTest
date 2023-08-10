const bodyParser = require('body-parser');
const HtmlPdf = require('../Utils/HtmlPdfConvertot')

exports.convertor = async( req, res) =>{
    const { url, outputFileName } = req.body;

    try{
        const convert= await HtmlPdf.HTMLPDF(url,outputFileName)
        res.status(200).json( {message: convert})
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Error generating PDF' });
    }
}