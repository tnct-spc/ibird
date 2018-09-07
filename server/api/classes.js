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
    year: Sequelize.TEXT,
    course: Sequelize.TEXT,
    randomSort: Sequelize.BOOLEAN
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
      title: Sequelize.TEXT,
      openMobile: Sequelize.BOOLEAN,
    },{
        timestamps: false
    });

//classidを渡したらドキュメントのリストを返してくれます
const docList = (classid)=>{
    return documents.findAll({
      where: {classid: classid}
    }).then( c =>{
        var returndata = c.filter(p => {
          var startTime = new Date(p.startTime)
          startTime = new Date(startTime.setHours(startTime.getHours() -9))
          var endTime = new Date(p.endTime)
          endTime = new Date(endTime.setHours(endTime.getHours() -9))
          endTime.setDate(endTime.getDate() + 1)

          const a = new Date() - startTime > 0 //開始日を過ぎているかどうか(当日はtrue)
          const b = endTime - new Date() > 0 //終了日より前(当日はtrue)
          return a&&b
        })
      return returndata
    })
}
const sortDocs = (classid) => {
  var makeRandom = ''
  classes.findById(classid)
    .then(result => {
      makeRandom = result.randomSort
    }).catch(err => {
      console.log(err)
      return 400
    })
  // 並べる場所,今はてきとう
  let cleanXYS = [
    {x: 200, y: 400},
    {x: 2200, y: 400},
    {x: 4200, y: 400},
    {x: 6200, y: 400},
    {x: 8200, y: 400},
    {x: 200, y: 5400},
    {x: 2200, y: 5400},
    {x: 4200, y: 5400},
    {x: 6200, y: 5400},
    {x: 8200, y: 5400}
  ]
  docList(classid).then(list => {
    // list並べる順番にsortする処理
    let temp = list
    temp.sort((a, b) => {
      if (a.endTime < b.endTime) return -1
      if (a.endTime > b.endTime) return 1
      if (a.docid < b.docid) return -1
      if (a.docid > b.docid) return 1
      return 0
    })
    let plis = []
    let lis = []
    temp.forEach(v => {
      if (v.priority === 1) plis.push(v)
      else lis.push(v)
    })
    let sortedList = plis.concat(lis)
    for (let i = 0; i < sortedList.length; i++) {
      if (cleanXYS.length <= i) {
        cleanXYS.push({
          x: cleanXYS[i - 1].x + 50,
          y: cleanXYS[i - 1].y + 50
        })
      }
      sortedList[i].x = cleanXYS[i].x
      sortedList[i].y = cleanXYS[i].y
      if (makeRandom && i < 9) {
        sortedList[i].x += Math.random() * 250 - 125
        sortedList[i].y += Math.random() * 250 - 125
      }
      sortedList[i].save()
    }
    const c = new W3cwebsocket('ws://localhost:3000/ws/refresh')
    c.onopen = () => c.send('{}')
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
              openMobile: doc.openMobile,
              title: doc.title,
              startTime: startTime,
              endTime: endTime,
            })
    })
    documents.bulkCreate(insertData)
      .then(result =>{
        res.sendStatus(200)
        classids.forEach(e => { sortDocs(e) })
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
      docid: docid
    }
  }).then(result => {
    res.sendStatus(200)
    sortDocs(classid)
  }).catch(err => {
    console.log(err)
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
    docList(classid).then(list => {
        var returndata = list.filter(p => {
            console.log(p.openMobile)
            return p.openMobile
        })
        res.json(returndata)
        console.log(returndata)
    }).catch(err => {
        res.statu(404)
    })
})

router.put('/sort-docs', (req, res, next) => {
    const classid = req.body.classid
    sortDocs(classid)
    res.sendStatus(200)
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
router.get('/years-and-courses', (req, res, next) => {
  let courseset = new Set()
  let yearset = new Set()
  classes.findAll()
    .then(result => {
      result.forEach(e => {
        courseset.add(e.year)
        yearset.add(e.course)
      })
      const obj = {
        years: Array.from(courseset.values()),
        courses: Array.from(yearset.values())
      }
      console.log(obj)
      res.json(obj)
    })
})

router.get('/classid', (req, res, next) => {
    const course = req.query.course
    const year = req.query.year
    classes.findOne({where:{
        course: course,
        year: year
    }}).then(result => {
        res.json({classid: result.classid})
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

router.get('/RandomSort', (req, res, next) => {
    const classid = req.query.classid
    classes.findOne({where: {classid: classid}})
    .then(result => {
       res.json({isRandom: result.randomSort})
    }).catch(err => {
        res.sendStatus(200)
        console.log(err)
    })
})

router.put('/RandomSort', (req, res, next) => {
    const classid = req.body.classid
    const isRandom = req.body.isRandom
    classes.findById(classid)
    .then(result => {
        result.randomSort = isRandom
        result.save()
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})
export default router
