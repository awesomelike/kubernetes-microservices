const express = require('express');
const indexRouter = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
indexRouter(app);


app.listen(3000, () => {
  console.log("Server started!");
})