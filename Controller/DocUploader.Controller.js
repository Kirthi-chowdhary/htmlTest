const docuploader = require('../Utils/DocUploader');

exports.Uploader = async (req, res) => {
  try {
    const parts = await docuploader.Doc(req.file.buffer);
    console.log(parts)
    res.status(200).json({ parts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'while uploading the document' });
  }
};
