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

//クラスのidを渡したらドキュメントのリストを返してくれます
const doc_list = (class_id)=>{
    return classes.findById(class_id).then( c =>{
        var list = []
        for(var i of Object.values(c.douments)) list.push(i)
        return list
    })
}

router.put('/add-doc', (req, res, next) => {
    const id = req.body.id
    const doc = req.body.doc

    doc_list(id).then(list =>{
        //listをいい感じに変更してデータベース更新
        list.push(doc)
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
    const class_id = req.query.classId
    const doc_id = req.query.docId

    doc_list(class_id).then(list =>{
        //doc_idが同じdocumetを省く
        return list.filter(value => value.id !== doc_id)
    }).then(new_list =>{
        return classes.update(
            {douments: new_list}, 
            {where: {id: class_id}}
        )
    }).then(result =>{
        console.log(result)
        res.sendStatus(200)
    }).catch(err =>{
        console.log(err)
        res.sendStatus(400)
    })

})

router.get('/classes', (req, res, next) => {
    classes.findAll().then(one_class => {
        res.json(one_class)
    })
})

export default router
