# ibird

> Nuxt.js project

## Build Setup
↓↓↓↓↓
``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```
↑↑↑↑↑
DBとか使っているのでこれだけでは動かない

Dockerで動かす
Dockerが何かわからない人は[ggrks](http://lmgtfy.com/?q=docker+%E8%A7%A3%E8%AA%AC)  
Docker 18.03.1-ce で動作確認しています

```bash
#起動
sudo docker-compose up -d
#終了
sudo docker-compose down
```
DBを初期化する必要がある
sequelize-cliを使う
```
node_modules/.bin/sequelize 
#もしくはglobalにinstallして
sequelize
```
下の例ではglobalにinstallしている
docker-composeで起動してる状態で
```
cd server
#DB作成
sequelize db:migrate
#seed(初期データ)作成
sequelize db:seed --seed seeders/20180807110914-year2.js
sequelize db:seed:all(非推奨、動きません)
```
とすればとりあえず動く
一度実行したあとはDBの構造などが変更されない限りdokerの実行のみで動く



For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).
