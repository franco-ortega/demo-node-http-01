const http = require('http');

const server1 = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on('data', (chunk) => {
    console.log(`Data chunk available: ${chunk}`);
  });

  req.on('end', () => {
    // end of data
  });
});

const server2 = http.createServer((req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    console.log(JSON.parse(data).todo); // 'Buy the food'
    res.end();
  });
});

const server3 = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  console.log(JSON.parse(data).todo); // 'Buy the food'
  res.end();
});

//////////////////////////////////////////////////////////////////
require('dotenv').config();
const https = require('https');
const { resolve } = require('path');
const potionsUrl = process.env.POTIONS_URL;

const getData = async (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      });

      res.on('error', (error) => {
        // console.log(error);
        reject(error);
      });
    });
  });
};


const potions = getData(potionsUrl).then((res) => console.log(res));
console.log('IMMEDIATE POTIONS - START');
console.log(potions);
console.log('IMMEDIATE POTIONS - END');



// Do other stuff with potionsList

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { 'Content-type': 'application/json' });
//     res.end(JSON.stringify({ hello: 'world' }));
//   })
//   .listen(1234, '127.0.0.1');
