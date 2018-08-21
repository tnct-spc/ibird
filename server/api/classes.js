import { Router } from 'express'
import Sequelize from 'sequelize'
import parser from 'body-parser'
import { w3cwebsocket } from 'websocket'

const W3cwebsocket = w3cwebsocket
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
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
//    documents: Sequelize.JSON,
    year: Sequelize.TEXT,
    course: Sequelize.TEXT
  },{
      timestamps: false
  });
  const documents = sequelize.define('documents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      docid: Sequelize.STRING,
      classid: Sequelize.INTEGER,
      x: Sequelize.INTEGER,
      y: Sequelize.INTEGER,
      priority: Sequelize.INTEGER,
      endTime: Sequelize.DATE,
      startTime: Sequelize.DATE,
    },{
        timestamps: false
    });

//classidを渡したらドキュメントのリストを返してくれます
const docList = (classid)=>{
    return documents.findAll({
      where: {classid: classid}
    }).then( c =>{
        return c
    })
}

router.put('/add-doc', (req, res, next) => {
    const classid = req.body.classid
    const doc = req.body.doc
    const now = new Date()
    var endTime = new Date()
    endTime.setDate(now.getDate()+7)
    return documents.create(
          {
            classid: classid,
            docid: doc.docid,
            x: doc.x,
            y: doc.y,
            priority: 1,//以下未実装
            startTime: now,
            endTime: endTime,//ここまで未実装
          }
    ).then(result =>{
        res.sendStatus(200)
    }).catch(err =>{
      console.log(err)
        res.sendStatus(400)
    })
})

router.put('/fix-position', (req, res, next) => {
    const classid = req.body.classid
    const docid = req.body.docid
    const x = req.body.x
    const y = req.body.y

    documents.update(
      {
        x: x,
        y: y,
      },
      {where: {
        classid: classid,
        docid: docid,
      }
      }
    ).then(result =>{
        res.sendStatus(200)
    }).catch(err =>{
        res.sendStatus(400)
    })
})

// router.put('/order-doc', (req, res, next) => {
//     const classid = req.body.classid
//     const docid = req.body.docid
//     docList(classid).then(list =>{
//         //listをいい感じに変更してデータベース更新
//         const buff = list.filter(value => value.docid === docid)
//         const newlist = list.filter(value => value.docid !== docid)
//         buff.forEach(v =>  newlist.push(v))

//         return classes.update(
//             {documents: newlist},
//             {where: {classid: classid}}
//         )
//     }).then(result =>{
//         res.sendStatus(200)
//     }).catch(err =>{
//         res.sendStatus(400)
//     })
// })

router.delete('/rm-doc', (req, res, next) => {
    const classid = req.query.classid
    const docid = req.query.docid

    classes.destroy({
      where: {
        classid: classid,
        docid: docid,
      }
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
      {x:200,y:0},
      {x:400,y:0},
      {x:600,y:0},
      {x:800,y:0},
      {x:1000,y:0},
      {x:1200,y:0},
      {x:1400,y:0},
    ]
      docList(classid).then(list =>{
        //list並べる順番にsortする処理
        var temp = []
        const now = new Date()
        for(let i=0;i<list.length;i++){
          var label = Math.ceil((list[i].endTime - now)/(1000 * 60 * 60 *24))
          label -= list[i].priority
          temp.push({
            data: list[i],
            label: label
          })
        }
        temp.sort((a,b) => {
            if (a.label < b.label) return -1;
            if (a.label > b.label) return 1;
            return 0;
        });

        var sortedList =[]
        temp.forEach(v => { sortedList.push(v.data)})
        for (let i=0; i<sortedList.length; i++) {
          sortedList[i].x = cleanXYS[i].x
          sortedList[i].y = cleanXYS[i].y
          sortedList[i].save()
        }
        const c = new W3cwebsocket('ws://localhost:3000/ws/refresh')
        c.onopen = () => c.send('{}')
      }).then(result =>{
          res.sendStatus(200)
      }).catch(err =>{
          console.log(err.message)
          res.sendStatus(400)
      })
})

export default router
