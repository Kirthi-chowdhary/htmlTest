const mammoth = require('mammoth');

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

    // Now each part in 'parts' should be approximately within the size limit
    // while avoiding breaking words.
      
    return parts;
  } catch (error) {
    throw error;
  }
};

function splitTextIntoParts(text) {
  const estimatedWordsPerPart = 1500; // Adjust this value based on your experiment
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
