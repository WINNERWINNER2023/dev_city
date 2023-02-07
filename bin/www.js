'use strict';

const app = require('../src/app.js');
// const SocketUtil = require('../src/utils/SocketUtil');
// const socketUtil = new SocketUtil(app);
// const ChatsController = require('../src/controllers/ChatsController');
// const chatsController = new ChatsController(app);

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

// const PORT = parseInt(process.env.PORT) || 3000;
// socketUtil.server.listen(PORT, () => {
//   console.log(`Listening on http://localhost:${PORT}`);
// });

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
