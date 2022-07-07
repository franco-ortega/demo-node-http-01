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
