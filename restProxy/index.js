const express = require('express');
const indexRouter = require('./routes');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
indexRouter(app);

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log("Server started!");
})