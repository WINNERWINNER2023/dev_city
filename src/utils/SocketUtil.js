// 'use strict';

// // 메시지 포맷 - 라이브러리 moment 설치 필요
// const moment = require('moment');

// function formatMessage(username, text) {
//   return {
//     username,
//     text,
//     time: moment().format('h:mm a'),
//   };
// }

// // 16-3. 방에 참여한 username, room 이름 내보내기
// const users = [];

// // Join user to chat
// function userJoin(id, username, room) {
//   const user = { id, username, room };

//   users.push(user);
//   return user;
// }

// // Get current user
// function getCurrentUser(id) {
//   return users.find((user) => user.id === id);
// }

// // User leaves chat
// function userLeave(id) {
//   const index = users.findIndex((user) => user.id === id);

//   if (index !== -1) {
//     // ??? 0으로 해도 되나?
//     return users.splice(index, 1)[0];
//   }
// }

// // Get room users
// function getRoomUsers(room) {
//   return users.filter((user) => user.room === room);
// }

// module.exports = {
//   formatMessage,
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// };
