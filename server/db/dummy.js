const Sequelize = require('sequelize');
const db = require('./');

const Dummy = db.define('dummy', {
  name: Sequelize.STRING,
});

module.exports = {
  db,
  Dummy,
};
