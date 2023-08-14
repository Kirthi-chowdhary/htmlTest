const cheerio = require('cheerio');
const axios = require('axios')

exports.Text = async(url) =>{
    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }
    try {
        const response = await axios.get(url);
        const htmlData = response.data;
        const $ = cheerio.load(htmlData);

        $('script').remove();
        const bodyContent = $('body').text();

        // Divide the plain text into chunks of 1500 words
        const chunks = [];
        for (let i = 0; i < bodyContent.length; i += 1500) {
            chunks.push(bodyContent.slice(i, i + 1500));
        }
        
       return chunks;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}