const express = require('express');
const indexRouter = require('./routes');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
indexRouter(app);

const port = process.env.PORT || 3000; 
app.get('/', (req, res) => {
  res.sendStatus(200);
  while(true) {
    for (let i=1; i<1000; i++) {
      const x = Math.random();
      console.log('INFINITE!');
    }
  }
})
app.listen(port, () => {
  console.log("Server started!");
})