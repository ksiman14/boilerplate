const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 1337;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./routes'));

app.listen(PORT, (req, res, next) => {
  console.log(`Listening on Port ${PORT}`);
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
