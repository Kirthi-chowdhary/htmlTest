const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const striptags = require('striptags');

const app = express();
const port = 3000;

// Helper function to split text into chunks of a specific length
function splitTextIntoChunks(text, chunkLength) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkLength) {
        chunks.push(text.slice(i, i + chunkLength));
    }
    return chunks;
}

app.get('/get-body-content', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
        const response = await axios.get(url);
        const htmlData = response.data;
        const $ = cheerio.load(htmlData);

        $('script').remove();
        const bodyContent = $('body').html();
        const plainTextContent = striptags(bodyContent);

        // Divide the plain text into chunks of 1500 words
        const chunkedText = splitTextIntoChunks(plainTextContent, 1500);

        res.json({ chunks: chunkedText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
