const express = require('express');
const app = express();
const port = 981;

app.get('/wifi-connect', (req, res) => {
  const data = req.query.data;
  if (data) {
    const decodedData = decodeURIComponent(data);
    res.send(`Received WiFi connection request: ${decodedData}`);
  } else {
    res.status(400).send('No data parameter provided');
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
