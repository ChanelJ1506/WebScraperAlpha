const express = require('express');
const bodyParser = require('body-parser');
const scrape = require('./scraper');
const Data = require('./database');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/scrape', async (req, res) => {
  const url = req.body.url;
  const data = await scrape(url);

  const scrapedData = new Data({ url, content: data });
  await scrapedData.save();

  res.json({ data });
});

app.get('/data', async (req, res) => {
  const allData = await Data.find();
  res.json(allData);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});