cd server

cat config/config.json
../node_modules/.bin/sequelize db:migrate:undo:all 
../node_modules/.bin/sequelize db:migrate 
../node_modules/.bin/sequelize db:seed:all 

