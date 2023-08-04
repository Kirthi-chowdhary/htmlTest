// const { MongoClient } = require('mongodb')

// // Create Instance of MongoClient for mongodb
// const client = new MongoClient('mongodb://localhost:27017')

// // Connect to database
// client.connect()
//     .then(() => console.log('Connected Successfully'))
//     .catch(error => console.log('Failed to connect', error))

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function readAndExtractWebPage(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Object to store the data
    const data = {};

    // Extract the data for each heading and its corresponding paragraphs
    $('h1, h2, h3, h4, h5, h6').each((index, headingElement) => {
      const heading = $(headingElement).text();
      const paragraphs = [];

      // Find the paragraphs associated with the current heading
      $(headingElement)
        .nextUntil('h1, h2, h3, h4, h5, h6')
        .each((i, paragraphElement) => {
          paragraphs.push($(paragraphElement).text());
        });

      // Store the data in the object
      data[heading] = paragraphs;
    });

    // Write the data to a JSON file
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error('Error reading webpage:', error.message);
    throw error;
  }
}

// Usage
const url = 'https://www.geeksforgeeks.org/express-js/?ref=lbp'; // Replace with the URL of the website you want to read data from
readAndExtractWebPage(url)
  .then((data) => {
    console.log('Data extracted:', data);
  })
  .catch((error) => {
    console.error('Error extracting data:', error.message);
  });

