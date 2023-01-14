'use strict'; // 엄격한 strict 모드로 설정. 잘 모르겠으면 없어도 무방

const express = require('express');
const app = express();

// 프론트엔드 세팅. 외우지말고 다른 프로젝트에서 가져와 쓰는식으로 사용하자
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

// app.get('/test', (req, res) => {
//   // res.render('test/a');
//   res.render('index', { components: 'test/a' });
// });
// app.get('/', (req, res) => {
//   res.render('index')
// });
const router = require('./routes'); // routes/index.js를 가리킨다.

console.log('0-1. app.js에서 라우터를 세팅 시키고 GET /api/sample를 받을 준비를 마친다.');
app.use('/', router); // 위에서 다뤘던 GET /test, / 두 path에 대해 routes/index.js에서 받게 변경
// 기존의 app.get에서 app.use로 바뀐 것을 볼 수 있다.

app.get('/*', (req, res) => res.redirect('/')); // 잘못된 uri에 대한 리다이렉트

// const PORT = 3000;
// app.listen(PORT, () => {  // bin/server.js에서 서버 실행되게 변경
//   console.log(`Listening on http://localhost:${PORT}`);
// });
module.exports = app; // bin/server.js에서 app을 가져다 쓸 수 있도록 모듈화 시킨다.
