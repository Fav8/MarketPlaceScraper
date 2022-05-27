const { scrapeSubito } = require('./scraper.js');

// Bootstrap function
async function filterPipe(...query) {
  // Data scraping and filtering
  // TODO: multiple queries to consider misspellings
  let data = await scrapeSubito(query.join("+"));
  data = data.filter(obj => filterData(obj, query));

  // Price filters
  const avg = average(data);
  return data.filter(obj => filterPrices(obj, avg));
}

// Filters
function filterData(object, query) {
  return (
    object.name.toLowerCase().includes('iphone')
    || object.name.toLowerCase().includes('i-phone')
  )
  //&& object.name.toLowerCase().includes('mini') === false
  && object.name.toLowerCase().includes(` ${query[query.length-1]} `)
  && object.price > 100;
}

// Price filter (70% cutoff)
function filterPrices(object, average) {
  return object.price < average * 0.85;
}

// Find the average price
function average(data) {
  const priceArr = [];
  for (const obj of data) {
    priceArr.push(obj.price);
  }
  console.log(priceArr.reduce((a, b) => a + b) / priceArr.length);
  return priceArr.reduce((a, b) => a + b) / priceArr.length;
}

module.exports = {filterPipe}