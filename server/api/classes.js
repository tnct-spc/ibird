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

    res.sendStatus(200)
})

router.get('/classes', (req, res, next) => {
    classes.findAll().then(one_class => {
        const data = JSON.parse(one_class)
        console.log(data)
        res.json(data)
    })
})

export default router
