# nodejs_basic_structure

> Node.js Project Basic Structure - with. Layered Architecture Pattern

```
npm install
npm run dev
```

팀원들에게 계층형 아키텍처 패턴(Layered Architecture Pattern)을    
설명하기 위해 만든 프로젝트

- - -

## api 흐름 파악

서버 실행 후   

```
localhost:3000/api/sample   
```

uri를 주소창에서 실행시키거나   

```
GET /api/sample
```

Thunder Client 등을 통해 요청하면   
console.log를 통해 기본적인 api의 흐름을 알 수 있다.

- - -

## api가 아닌 view 페이지로의 이동

```
localhost:3000   
localhost:3000/test   
```

위 두 uri를 통해 ejs 파일에 접근할 수 있다.