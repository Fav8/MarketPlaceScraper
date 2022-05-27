const ObjectsToCsv = require('objects-to-csv');
const { filterPipe } = require('./filter.js');

async function bootstrap(){
  let csvData = []
const iphone12 = await filterPipe('iphone','12');
const csv = new ObjectsToCsv(iphone12);
  await csv.toDisk('./test.csv');
}

bootstrap()