const express = require('express');
const indexRouter = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
indexRouter(app);

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log("Server started!");
})