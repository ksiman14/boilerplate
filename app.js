const path = require('path');
const express = require('express');
const app = express();
const PORT = 1337;

app.use(express.static(path.join(__dirname, './public')));

app.listen(PORT, (req, res, next) => {
  console.log(`Listening on Port ${PORT}`);
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
