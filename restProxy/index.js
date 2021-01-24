const express = require('express');
const indexRouter = require('./routes');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
indexRouter(app);

let flag = true;

const port = process.env.PORT || 3000;

app.get('/version', (req, res) => {
  res.status(200).json({message: 'API Version 2'});
})

app.get('/ready', (req, res) => {
  res.sendStatus(200);
});

app.get('/loadCpu', (req, res) => {
  flag = true;
  res.sendStatus(200);
  for (let i=1; i< Math.pow(10, 6) / 2; i++) {
    const x = Math.random();
    console.log('INFINITE!', x);
  }
});

app.get('/unloadCpu', (req, res) => {
  flag = false;
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log("Server started!");
})