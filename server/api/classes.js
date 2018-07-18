import { Router } from 'express'
import Sequelize from 'sequelize'

const router = Router()

const sequelize = new Sequelize('ibird', 'postgres', 'password',{
    host: 'postgres',
    dialect: 'postgres',
    operatorsAliases: false
})
const classes = sequelize.define('classes', {
    name: Sequelize.STRING,
    douments: Sequelize.ARRAY(Sequelize.TEXT)
  },{
      timestamps: false
  });

router.get('/classes', (req, res, next) => {
    classes.findAll().then(one_class => {
        const data = JSON.stringify(one_class)
        console.log(data)
    })
    res.sendStatus(200)
})

export default router
