const express = require('express');
const app = express();
const PORT = 3000;

const routes = require('./routes/posts.router.js');

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});