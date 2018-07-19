import { Router } from 'express'
import Sequelize from 'sequelize'
import parser from 'body-parser'

const router = Router()
router.use(parser.urlencoded({ extended: false }));
router.use(parser.json());

const sequelize = new Sequelize('ibird', 'postgres', 'password',{
    host: 'postgres',
    dialect: 'postgres',
    operatorsAliases: false
})
const classes = sequelize.define('classes', {
    name: Sequelize.STRING,
    douments: Sequelize.JSON
  },{
      timestamps: false
  });

router.put('/add-doc', (req, res, next) => {
    const id = req.body.id
    const doc = req.body.doc

    classes.findById(id).then( c =>{
        //いいかんじにJSONをつくって追加
        var list = []
        for(var i of Object.values(c.douments)) list.push(i)
        
        list.push(doc)
        return list
    }).then(list =>{
        return classes.update(
            {douments: list}, 
            {where: {id: id}}
        )
    }).then(result =>{
        console.log(result)
        res.sendStatus(200)
    }).catch(err =>{
        console.log(err)
        res.sendStatus(400)
    })
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
