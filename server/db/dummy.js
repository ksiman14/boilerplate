const Sequelize = require('sequelize');
const db = require('./');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const Dummy = db.define('dummy', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
});

Dummy.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, `${process.env.JWT}`);
};

Dummy.prototype.correctPassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

Dummy.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

Dummy.authenticate = async function ({ name, password }) {
  const user = await this.findOne({ where: { name } });
  if (!user || !(await user.correctPassword(password))) {
    const error = new Error('Incorrect username or password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

Dummy.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, `${process.env.JWT}`);
    const user = Dummy.findByPk(id);
    if (!user) {
      throw 'Invalid user!';
    }
    return user;
  } catch (err) {
    const error = new Error('bad token');
    error.status = 401;
    throw error;
  }
};

const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

module.exports = Dummy;
