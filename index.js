const puppeteer = require('puppeteer');
const fs = require('fs');
require('events').EventEmitter.defaultMaxListeners = 0
require('./data.json')


// Function to search data in a new tab
async function searchDataInNewTab(data) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=${data}`);
  console.log(`Searched data: ${data}`);
  
  // await browser.close();
}
// Read JSON file and search each data entry in a new tab
fs.readFile('./data.json', 'utf8', async(err, jsonString) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  } 
  try {
    const data = JSON.parse(jsonString);
    // Iterate over each data entry and search in a new tab
    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
        await searchDataInNewTab(entry.Company)
        .catch((err) => console.error(`Error searching data ${entry}:`, err));
    }
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});

fs.writeFileSync