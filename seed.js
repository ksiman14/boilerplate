const db = require('./server/db');
const Dummy = require('./server/db/dummy');

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Dummy.create({ name: 'lucy', password: 'lucy_pw' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.log('Seed went wrong :/');
      console.error(err);
      db.close();
    });
}
