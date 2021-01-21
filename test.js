const https = require('http');

const postData = JSON.stringify({
  "email": "mamuraka.dev@gmail.com",
  "password": "mamur"
});


for (let i=0; i<100; i++) {
  const options = {
    hostname: '192.168.49.2',
    port: 31253,
    path: '/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(postData);
  req.end();
}
