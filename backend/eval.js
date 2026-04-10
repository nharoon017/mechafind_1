const http = require('http');

http.get('http://localhost:5000/api/requests/single/fake_id', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('GET Status:', res.statusCode, data));
});
