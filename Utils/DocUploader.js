const { v4: uuidv4 } = require("uuid");
const mammoth = require('mammoth');
const officegen = require('officegen');
const fs = require('fs');
const path = require('path'); // Import the path module

exports.Doc = async (doc) => {
  if (!doc) {
    throw new Error('No file uploaded.');
  }

  const fileBuffer = doc;

  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    const text = result.value;

    // Split text into parts based on estimatedWordsPerPart
    const parts = splitTextIntoParts(text);

    const outputPath = path.join(__dirname, '..', 'output'); // Construct the output path
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    const generatedFiles = []; // Array to store generated file paths

    const promises = parts.map(async (templatechunk, i) => {
      
      let fileId = uuidv4();
      console.log(fileId)
      const docx = officegen('docx');
      const pObj = docx.createP();
      
      pObj.addText(`Part ${i + 1}`, { bold: true })
      const contentP = docx.createP();
      contentP.addText(templatechunk);
      const outputFilePath = path.join(outputPath, `${fileId}.docx`);
      const outputStream = fs.createWriteStream(outputFilePath);
      docx.generate(outputStream);

      generatedFiles.push(outputFilePath); // Store the generated file path
      
      
    });
    try {
      console.log("Generated files:", generatedFiles);
      const responses = await Promise.all(promises);await Promise.all(promises);
      
    } catch (error) {
      // res.status(500).json({ message: error });
    }

    // Return the array of generated file paths
    return generatedFiles;
  } catch (error) {
    throw error;
  }
};

function splitTextIntoParts(text) {
  const estimatedWordsPerPart = 15000;
  const words = text.split(' ');

  const parts = [];
  let currentPart = '';

  for (const word of words) {
    if ((currentPart + word).length > estimatedWordsPerPart) {
      parts.push(currentPart);
      currentPart = '';
    }
    currentPart += (currentPart ? ' ' : '') + word;
  }

  if (currentPart) {
    parts.push(currentPart);
  }

  return parts;
}
