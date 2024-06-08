require('dotenv').config();
const express = require('express');
const { port } = require('./app/config/config');
const apiRoute = require('./app/routes/api-routes');

const app = express();

app.use('/v1', apiRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})