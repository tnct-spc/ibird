import { Router } from 'express'
import Sequelize from 'sequelize'
import parser from 'body-parser'

const router = Router()
router.use(parser.urlencoded({ extended: false }));
router.use(parser.json());

const sequelize = new Sequelize('ibird', 'postgres', 'password',{
    host: 'postgres',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
})
const classes = sequelize.define('classes', {
    classid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    documents: Sequelize.JSON
  },{
      timestamps: false
  });

//classidを渡したらドキュメントのリストを返してくれます
const docList = (classid)=>{
    return classes.findById(classid).then( c =>{
        var list = []
        for(var i of Object.values(c.documents)) list.push(i)
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
            {documents: list}, 
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
        //docidが同じdocumentを省く
        return list.filter(value => value.docid !== docid)
    }).then(newList =>{
        return classes.update(
            {documents: newList}, 
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
        const list = []
        c.forEach((value, index, array) =>{
            delete value.dataValues.documents
            list.push(value.dataValues)
        })
        res.json(list)
    })
})

router.get('/class-docs', (req, res, next) => {
    const classid = req.query.classid
    docList(classid).then(list =>{
        res.json(list)
    })
})

export default router