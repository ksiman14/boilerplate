const db = require('./db');
const app = require('./');

const PORT = process.env.PORT || 1337;

app.listen(PORT, async (req, res, next) => {
  await db.sync();
  console.log(`Listening on Port ${PORT}`);
});
