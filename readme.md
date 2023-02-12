# 데브시티(DevCity)

'데브시티(DevCity)', 내일배움캠프 캐릭터의 재능을 거래하는 이커머스 웹 페이지

## 목차

- [기획안](#기획안)
- [발표 PPT](#발표-ppt)
- [시연 영상](#시연-영상)
- [회고록](#회고록)
- [.env Settings](#env-settings)
- [DB랑 Table 생성](#db랑-table-생성)

### 기획안

[Notion - 링크](https://www.notion.so/e-85b15a972ef54211abda5556e8d2d6c9)

### 발표 PPT

[Googole Presentation - 링크](https://docs.google.com/presentation/d/1hfnP6gP54iz7mkT-fmDBt1hhzk_ysTpyTsjO7eWsRU0/edit#slide=id.g1f08e8c50c2_1_49)

### 시연 영상

[![데브시티 시연영상](https://img.youtube.com/vi/LmmGEA8DwzY/0.jpg
)](https://youtu.be/LmmGEA8DwzY) 

### 회고록

[Notion - 링크](https://skillful-cyclamen-d40.notion.site/e-4bdff68c6e6046e9a170da5f13a59f8b)

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