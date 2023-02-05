const chatForm = document.getElementById('chat-form'); // 11-1. DOM으로 메시지 output
const chatMessages = document.querySelector('.chat-messages'); // 12-1. Scroll down / ('.chat-messages')에서 . 빼놓으면 안됨
const roomName = document.getElementById('room-name'); // 17-4-2. Add room name to DOM - 사이드바 Room Name, Users 정보 내보내기
const userList = document.getElementById('users'); // 17-5-2. Add users name to DOM - 사이드바 Room Name, Users 정보 내보내기

// 15-1. Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io(); // 5-3. socket.io 모듈 설치

socket.emit('joinRoom', { username, room }); // 16-1. 방에 참여한 username, room 이름 내보내기

// 17-3. 사이드바 Room Name, Users 정보 내보내기
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from Server
socket.on('message', (message) => {
  console.log(message); // 6-3. 프론트엔드 콘솔창에 출력
  outputMessage(message); // 11-2. DOM으로 메시지 output

  // 12-2. Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// 사용자가 입력한 메시지 submit
chatForm.addEventListener('submit', (e) => {
  // 10-1. 메시지 submit하는 이벤트
  e.preventDefault(); // 10-2. [js 문법] .preventDefault() : html 에서 a 태그나 submit 태그는 고유의 동작이 있다. 페이지를 이동시킨다거나 form 안에 있는 input 등을 전송한다던가 그러한 동작이 있는데 e.preventDefault 는 그 동작을 중단시킨다.(*e.stopPropagation()와 차이 - 이벤트가 상위 엘리먼트에 전달되지 않게 막아)

  // 메시지 텍스트 받기
  const msg = e.target.elements.msg.value; // 10-3-1. chat.html 파일 내 input 태그의 id="msg"
  // console.log(msg) // 10-3-2. 채팅 메시지 입력창에 입력한 메시지 내용이 출력됨- 프론트엔드 콘솔창으로 msg가 어떤 걸 의미하는지 확인해보기

  // 서버에 메시지 submit
  socket.emit('chatMessage', msg); // 10-4-1. 서버에 메시지 submit

  // 13. 메시지 입력창 비우기
  e.target.elements.msg.value = ''; // 13-1. chat.html 파일 내 input 태그의 id="msg"
  e.target.elements.msg.focus(); // 13-2. 입력 후 커서 그대로 입력창에 남게하기
});

// 11-3. DOM으로 메시지 output
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </sapn></p>
    <p class="text">
    ${message.text}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div); // class라서 getElementById가 아닌 querySelector로
}

// 17-4-1. Add room name to DOM - 사이드바 Room Name, Users 정보 내보내기
function outputRoomName(room) {
  roomName.innerText = room;
}

// 17-5-1. Add users name to DOM - 사이드바 Room Name, Users 정보 내보내기
function outputUsers(users) {
  userList.innerHTML = `
      ${users.map((user) => `<li>${user.username}</li>`).join('')}`;
}
