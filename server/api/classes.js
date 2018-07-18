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

router.put('/add-doc', (req, res, next) => {
    classes.update(
            {name: Date()},
            {where: {id: '20160401'}}
    ).then(result =>{
        console.log(result)
    }).catch(err =>{
        console.log(err)
    })
    res.sendStatus(200)
})

router.delete('/rm-doc', (req, res, next) => {

    res.sendStatus(200)
})

router.get('/classes', (req, res, next) => {
    classes.findAll().then(one_class => {
        const data = JSON.stringify(one_class)
        res.json(data)
    })
})

export default router
