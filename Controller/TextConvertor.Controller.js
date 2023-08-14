const bodyParser = require('body-parser')
const text = require('../Utils/TextConvertor')

exports.convertor = async( req, res) =>{
    const  url  = req.query.url;

    try{
        const convert= await text.Text(url)
        res.status(200).json( {message: convert})
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Error converting  Webpage to text' });
    }
}