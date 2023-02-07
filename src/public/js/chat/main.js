const chatForm = document.getElementById('chat-form'); // 11-1. DOM으로 메시지 output
const chatMessages = document.querySelector('.chat-messages'); // 12-1. Scroll down / ('.chat-messages')에서 . 빼놓으면 안됨
const roomName = document.getElementById('room-name'); // 17-4-2. Add room name to DOM - 사이드바 Room Name, Users 정보 내보내기
const userList = document.getElementById('users'); // 17-5-2. Add users name to DOM - 사이드바 Room Name, Users 정보 내보내기

// 15-1. Get username and room from URL
const { username, room } = qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// socket.io 모듈 설치
const socket = io(); // 5-3.
// 채팅방명, 접속자명
socket.emit('joinRoom', { username, room });

// 사이드바 Room Name, Users 정보 내보내기
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// 서버에서 메시지 받기
socket.on('message', (message) => {
  outputMessage(message); // DOM으로 메시지 output

  chatMessages.scrollTop = chatMessages.scrollHeight; // 스크롤 내리기
});

// 사용자가 입력한 메시지 submit
chatForm.addEventListener('submit', (event) => {
  event.preventDefault(); // 메시지 보내기

  // 메시지 텍스트 받기(chat.html 파일 내 input 태그의 id="msg")
  const msg = event.target.elements.msg.value;

  // 서버에 메시지 submit
  socket.emit('chatMessage', msg);

  // 13. 메시지 입력창 비우기
  event.target.elements.msg.value = ''; // chat.html 파일 내 input 태그의 id="msg"
  event.target.elements.msg.focus(); // 커서 포커스
});

// DOM으로 메시지 보내기
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </sapn></p>
    <p class="text">
    ${message.text}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div); // class라서 getElementById가 아닌 querySelector로
}

// 사이드바 채팅방명
function outputRoomName(room) {
  roomName.innerText = room;
}

// 사이드바 접속자명
function outputUsers(users) {
  userList.innerHTML = `
      ${users.map((user) => `<li>${user.username}</li>`).join('')}`;
}
