'use strict';

const app = require('../src/app.js');

const models = require('../src/sequelize/models/index');
models.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch((err) => {
    console.log('DB 연결 실패');
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
