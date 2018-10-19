[![CircleCI](https://circleci.com/gh/tnct-spc/ibird.svg?style=svg)](https://circleci.com/gh/tnct-spc/ibird)
# ibird

## Build Setup

Dockerで動かす
Dockerが何かわからない人は[ggrks](http://lmgtfy.com/?q=docker+%E8%A7%A3%E8%AA%AC)  
Docker 18.03.1-ce で動作確認しています

```bash
#起動
sudo docker-compose up
#終了
Ctr+C
```

DBが更新された場合はDBをリセットしないと動かないことがる
docker-compose upをしてる状態で
```
sudo docker exec -it ibird.node_express sh resetdb.sh   
```
これでDBをリセットしてくれる



For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).
