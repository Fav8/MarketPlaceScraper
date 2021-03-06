const puppeteer = require('puppeteer');

async function scrapeSubito (query) {
  // Puppeteer stuff
  const url = `https://www.subito.it/annunci-lombardia/vendita/telefonia/milano/milano/?q=${query}`;

  const browser = await puppeteer.launch({
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto(url);

  let htmlPathNames = "#layout > main > div:nth-child(3) > div.ListingContainer_container__4DQ56.container > div.ListingContainer_col__1TZpb.ListingContainer_items__3lMdo.col.items > div.container.ItemListContainer_container__SjEc1 > div:nth-child(2) > div > div > a > div > div > div.SmallCard-module_upper-data-group__aRFDu.upper-data-group > div > h2";
  //                    #layout > main > div:nth-child(3) > div.ListingContainer_container__4DQ56.container > div.ListingContainer_col__1TZpb.ListingContainer_items__3lMdo.col.items > div.container.ItemListContainer_container__SjEc1 > div:nth-child(2) > div > div:nth-child(2) > a > div > div > div.SmallCard-module_upper-data-group__aRFDu.upper-data-group > div > div.feature-row.index-module_container__zrC59 > p
  let htmlPathPrices = "#layout > main > div:nth-child(3) > div.ListingContainer_container__4DQ56.container > div.ListingContainer_col__1TZpb.ListingContainer_items__3lMdo.col.items > div.container.ItemListContainer_container__SjEc1 > div:nth-child(2) > div > div > a > div > div > div.SmallCard-module_upper-data-group__aRFDu.upper-data-group > div > div.feature-row.index-module_container__zrC59 > p";
  let htmlPathLinks = "#layout > main > div:nth-child(3) > div.ListingContainer_container__4DQ56.container > div.ListingContainer_col__1TZpb.ListingContainer_items__3lMdo.col.items > div.container.ItemListContainer_container__SjEc1 > div:nth-child(2) > div > div > a";

  // Keep only necessary data
  const names = await page.$$eval(htmlPathNames, names => {
    return names.map(name => name.textContent);
  })
  const prices = await page.$$eval(htmlPathPrices, prices => {
    //TODO FIX PRICES ABOVE 1000 ES. 1050 => 1.05
    return prices.map(price => Number(price.textContent.slice(0, 3).trim()));
  });
  const links = await page.$$eval(htmlPathLinks, links => {
    return links.map(links => links.href);
  });

  // Fuck yo browser
  await browser.close();
  console.log(prices, "prices>");
  // Create an array of (object for every result) { name, link, price }
  const result = [];
  for (const index in names) {
    result.push({
      name: names[index],
      link: links[index],
      price: prices[index]
    });
  }

  // Return these objects
  return result;
};

module.exports = { scrapeSubito };