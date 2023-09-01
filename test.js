const officegen = require('officegen');
const fs = require('fs');

function convertDocxToPdf(inputDocxPath, outputPdfPath) {
  const docx = officegen('docx');

  // Read the DOCX file
  const inputStream = fs.createReadStream(inputDocxPath);

  // Create a write stream for the PDF file
  const pdfStream = fs.createWriteStream(outputPdfPath);

  // Pipe the input DOCX stream to the docx object
  inputStream.pipe(docx);

  // Pipe the output of the docx object to the PDF stream
  docx.generate(pdfStream);

  pdfStream.on('finish', () => {
    console.log(`Conversion completed. PDF saved to ${outputPdfPath}`);
  });

  pdfStream.on('error', (error) => {
    console.error('Error:', error);
  });
}

// Usage
const inputDocxPath = 'JEST DOCUMENTATION.docx'; // Replace with your DOCX file path
const outputPdfPath = 'output.pdf'; // Replace with your desired PDF output path

convertDocxToPdf(inputDocxPath, outputPdfPath);
