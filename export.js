const ObjectsToCsv = require('objects-to-csv');
const { filterPipe } = require('./filter.js');

async function bootstrap(){
  let csvData = []
const iphone12 = await filterPipe('iphone','12');
/*   if(process.argv[3] === 'iphone'){
  const iphone11 = await filterPipe('iphone','11');
  const iphone12 = await filterPipe('iphone','12');
  const iphone13 = await filterPipe('iphone','13');
  const iphonexr = await filterPipe('iphone','xr');
  csvData.push(iphone11,iphone12,iphone13,iphonexr)
  } */
const csv = new ObjectsToCsv(iphone12);
  await csv.toDisk('./test.csv');
}

bootstrap()