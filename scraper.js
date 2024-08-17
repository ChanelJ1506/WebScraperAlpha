const axios = require('axios');
const cheerio = require('cheerio');

async function scrape(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Collect all headings from the page
    const headings = [];
    $('h1, h2, h3').each((i, elem) => {
      headings.push($(elem).text());
    });

    console.log(headings);
    return headings;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Page not found (404)');
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}

module.exports = scrape;