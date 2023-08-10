const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const apirouter = require('./Routes/HTMLPDFConveter');
app.use('/api', apirouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
