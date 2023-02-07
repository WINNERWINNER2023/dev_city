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

BCRYPT_SALT=

JWT_SECRET_KEY=""
JWT_ACCESS_EXPIRES="30s"
JWT_REFRESH_EXPIRES="5m"
REDIS_REFRESH_TTL=300

MULTER_UPLOADS_PATH="./src/public/uploads"
UPLOADS_PATH="public/uploads"

ADMINS_PAGE_LIMIT=10
ADMINS_SECTION_LIMIT=10
```

### DB랑 Table 생성

```
cd src/sequelize
npx sequelize db:create
npx sequelize db:migrate
NODE_ENV=test npx sequelize db:create
NODE_ENV=test npx sequelize db:migrate
```