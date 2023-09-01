const express = require('express');
const mammoth = require('mammoth');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const fileUpload = require('express-fileupload');
const path = require('path'); // Add this line to use the path module

const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());

app.post('/convert', async (req, res) => {
  try {
    if (!req.files || !req.files.docxContent) {
      return res.status(400).send('No file uploaded.');
    }

    const docxFile = req.files.docxContent;
    const docxContentBuffer = docxFile.data;

    // Convert .docx to HTML using Mammoth
    const { value: html } = await mammoth.convertToHtml({ buffer: docxContentBuffer });

    // Create a PDF document
    const doc = new PDFDocument();
    const pdfPath = path.resolve(__dirname, 'converted.pdf'); // Resolve the absolute path

    // Pipe the HTML content to the PDF
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text(html);

    // End the PDF stream and respond with the PDF file
    doc.end();
    res.sendFile(pdfPath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Conversion failed.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
