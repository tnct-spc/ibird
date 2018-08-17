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
    documents: Sequelize.JSON,
    year: Sequelize.TEXT,
    course: Sequelize.TEXT
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
        //listにいい感じに追加してデータベース更新
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

router.put('/fix-position', (req, res, next) => {
    const classid = req.body.classid
    const docid = req.body.docid
    const x = req.body.x
    const y = req.body.y

    docList(classid).then(list =>{
        //listをいい感じに変更してデータベース更新
        list.forEach(v => {
            if(v.docid == docid){
                v.x = x
                v.y = y
            }
        })
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

router.put('/sort-docs', (req, res, next) => {
    const classid = req.body.classid
    console.log(classid)
    //並べる場所,今はてきとう
    const cleanXYS = [
      {x:0,y:0},
      {x:10,y:0},
      {x:20,y:0},
      {x:30,y:0},
      {x:40,y:0},
      {x:50,y:0},
      {x:60,y:0},
      {x:70,y:0},
    ]
      docList(classid).then(list =>{
        //list並べる順番にsortする処理
        //いまは一番はやく消えるもの
        console.log(list)
        var sortedList = list
        console.log(sortedList)
        for (let i=0; i<sortedList.length; i++) {
          console.log(cleanXYS[i].x)
          sortedList[i].x = cleanXYS[i].x
          sortedList[i].y = cleanXYS[i].y
        }
        return classes.update(
          {documents: sortedList},
          {where: {classid: classid}}
        )
      }).then(result =>{
          res.sendStatus(200)
      }).catch(err =>{
          console.log(err.message)
          res.sendStatus(400)
      })
})

export default router
