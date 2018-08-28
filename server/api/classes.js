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
        autoIncrement: true
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
      updatedAt: Sequelize.DATE,
      Title: Sequelize.TEXT,
      OpenMobile: Sequelize.BOOLEAN,
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

router.post('/add-doc', (req, res, next) => {
    const classids = req.body.classids
    const doc = req.body
    const startTime = new Date(doc.startTime)
    const endTime = new Date(doc.endTime)
    let insertData = []
    classids.forEach((e)=>{
        insertData.push(
            {
              classid: e,
              docid: doc.docid,
              x: doc.x,
              y: doc.y,
              priority: doc.priority,
              startTime: startTime,
              endTime: endTime,
            })
    })
    documents.bulkCreate(insertData)
      .then(result =>{
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

router.put('/order-doc', (req, res, next) => {
     const classid = req.body.classid
     const docid = req.body.docid
     console.log(classid)
     console.log(docid)
     return documents.update(
         {updatedAt : Date.now()},
         {where: {
             classid: classid,
             docid: docid
         }}
     ).then(result =>{
         res.sendStatus(200)
     }).catch(err =>{
         res.sendStatus(400)
     })
 })

router.delete('/rm-doc', (req, res, next) => {
    const classid = req.query.classid
    const docid = req.query.docid

    documents.destroy({
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

router.get('/class-docs-mobile', (req, res, next) => {
    const classid = req.query.classid
    documents.findAll({
      where: {
        classid: classid,
        OpenMobile: true,
      }
    }).then(list =>{
        res.json(list)
    }).catch(err =>{
        res.statu(404)
    })
})
router.put('/sort-docs', (req, res, next) => {
    const classid = req.body.classid
    //並べる場所,今はてきとう
    const cleanXYS = [
      {x:30,y:20},
      {x:260,y:20},
      {x:490,y:20},
      {x:720,y:20},
      {x:950,y:20},
      {x:30,y:380},
      {x:260,y:380},
      {x:490,y:380},
      {x:720,y:380},
      {x:950,y:380},
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

router.put('/class', (req, res, next) => {
  const year = req.body.year
  const course = req.body.course
  return classes.create({
    year: year,
    course: course
  }).then(result => {
    res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})
router.delete('/class', (req, res, next) => {
  const classid = req.query.classid
  console.log(classid)
  return classes.destroy({
    where: {classid: classid}
  }).then(result => {
    res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

export default router
