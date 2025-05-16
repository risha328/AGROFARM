const express = require('express');
const axios = require('axios');
const csv = require('csvtojson');

const router = express.Router();

// Replace with your published CSV link
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsCKpBs1rqa7IWAZ9W3KfeB6kkPa48ZcPghmYZNRP63kD4kKDUkhJK81eeEOURigVJwnwJTwamCbxp/pub?output=csv';

router.get('/gform-responses', async (req, res) => {
  try {
    const response = await axios.get(sheetUrl);
    const jsonData = await csv().fromString(response.data);
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Google Form responses');
  }
});

module.exports = router;
