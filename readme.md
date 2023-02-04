# 데브시티(DevCity)

'데브시티(DevCity)', 내일배움캠프 캐릭터의 재능을 거래하는 이커머스 웹 페이지

## 목차

- [.env Settings](#env-settings)
- [DB랑 Table 생성](#db랑-table-생성)

### .env Settings

```
NODE_ENV="development"
# NODE_ENV="test"
# NODE_ENV="production"

PORT=3000

MYSQL_USERNAME=""
MYSQL_PASSWORD=""
MYSQL_DATABASE=""
MYSQL_DATABASE_TEST=""
MYSQL_HOST=""
```

### DB랑 Table 생성

```
cd src/sequelize
npx sequelize db:create
npx sequelize db:migrate
```