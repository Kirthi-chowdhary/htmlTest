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

        //spliting the words
        const words = bodyContent.split(' ');

        // Divide the plain text into chunks of 1500 words
        const chunkSize = 1500;
        const overlapSize = 300; // Adjust as needed
        const chunks = [];
        let currentChunk = '';

        for (const word of words) {
            const newChunkLength = (currentChunk + word + ' ').length;

            if (newChunkLength <= chunkSize) {
                currentChunk += word + ' ';
            } else {
                const overlapPart = currentChunk.slice(-overlapSize).trim();
                chunks.push(currentChunk.trim());
                currentChunk = overlapPart + ' ' + word + ' ';
            }
        }

        if (currentChunk.trim() !== '') {
            chunks.push(currentChunk.trim());
        }
        
       return chunks;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}