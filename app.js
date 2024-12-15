const express = require('express');
const wifi = require('node-wifi');

const app = express();
const port = 981;

wifi.init({
  iface: null
});

app.get('/wifi-connect', (req, res) => {
  const data = req.query.data;
  if (data) {
    const decodedData = decodeURIComponent(data);
    const wifiDetails = parseWifiData(decodedData);
    if (wifiDetails) {
      wifi.connect(wifiDetails, (error) => {
        if (error) {
          res.status(500).send(`Failed to connect: ${error.message}`);
        } else {
          res.send(`Successfully connected to ${wifiDetails.ssid}`);
        }
      });
    } else {
      res.status(400).send('Invalid WiFi data format');
    }
  } else {
    res.status(400).send('No data parameter provided');
  }
});

function parseWifiData(data) {
  const regex = /WIFI:T:(.*?);S:(.*?);P:(.*?);/;
  const match = data.match(regex);
  if (match) {
    return {
      ssid: match[2],
      password: match[3]
    };
  }
  return null;
}

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
