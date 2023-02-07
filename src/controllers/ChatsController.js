'use strict';

// const ChatsService = require('../services/ChatsService');

const http = require('http');
const socketio = require('socket.io');

class ChatsController {
  // chatsService = new ChatsService();

  constructor(app) {
    this.server = http.createServer(app);
    ChatsController.wsServer = socketio(this.server);
    this.load();
  }
  static wsServer;

  load = () => {
    // 사용자 연결
    const io = ChatsController.wsServer;
    io.on('connection', (socket) => {
      socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit(
          'message',
          formatMessage('챗봇 : 데브시티 실시간 문의 채팅방입니다. 상업·홍보성/장난/욕설·음란성의 글은 삼가주세요.')
        );
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username}님이 채팅방에 참여했습니다.`)); // 16-6. 방에 참여한 username, room 이름 내보내기 (*to로 specific room으로 내보내기)
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      });
      socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
      });

      // 사용자 연결 해제
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
          io.to(user.room).emit('message', formatMessage(botName, `${user.username}님이 채팅방을 나갔습니다.`));
        }
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      });
    });
  };
  // static alertNewOrder = () => {
  //   io.sockets.emit('newOrder', true);
  // };
}
module.exports = ChatsController;
