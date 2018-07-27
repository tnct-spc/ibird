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
    classid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    douments: Sequelize.JSON
  },{
      timestamps: false
  });

//classidを渡したらドキュメントのリストを返してくれます
const docList = (classid)=>{
    return classes.findById(classid).then( c =>{
        var list = []
        for(var i of Object.values(c.douments)) list.push(i)
        return list
    })
}

router.put('/add-doc', (req, res, next) => {
    const classid = req.body.classid
    const doc = req.body.doc

    docList(classid).then(list =>{
        //listをいい感じに変更してデータベース更新
        list.push(doc)
        return classes.update(
            {douments: list}, 
            {where: {classid: classid}}
        )
    }).then(result =>{
        res.sendStatus(200)
    }).catch(err =>{
        res.sendStatus(400)
    })
})

router.delete('/rm-doc', (req, res, next) => {
    const classid = req.query.classid
    const docid = req.query.docid

    docList(classid).then(list =>{
        //docidが同じdocumetを省く
        return list.filter(value => value.docid !== docid)
    }).then(newList =>{
        return classes.update(
            {douments: newList}, 
            {where: {classid: classid}}
        )
    }).then(result =>{
        res.sendStatus(200)
    }).catch(err =>{
        res.sendStatus(400)
    })
})

router.get('/classes-list', (req, res, next) => {
    classes.findAll().then(c => {
        res.json(c)
    })
})

router.get('/class-docs', (req, res, next) => {
    const classid = req.query.classid
    console.log("classid")
    docList(classid).then(list =>{
        res.json(list)
    })
})

export default router
