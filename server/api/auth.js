import { Router } from 'express'
import Sequelize from 'sequelize'
import parser from 'body-parser'
import sechash from 'sechash'

const router = Router()
router.use(parser.urlencoded({ extended: false }));
router.use(parser.json());

const sequelize = new Sequelize('ibird', 'postgres', 'password', {
    host: 'postgres',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
})
const hashopt = {
    algorithm: 'sha512', // アルゴリズム
    iterations: 2000, // 繰り返し回数
    salt: 'asdfghjkl' // ソルトの設定
};


const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.TEXT,
    hashedPassword: Sequelize.TEXT
}, {
    timestamps: false
});

router.post('/login', (req, res, next) => {
    const password = req.body.password
    const username = req.body.username
    //console.log(sechash.strongHashSync(username, hashopt))
    users.findOne({where: {username: username}}).then(user => {
        if (!user){
            res.status(401).json({ message: 'ユーザーネームが間違っています' })
        }
        //hash化して確認
        else if (user.hashedPassword === sechash.strongHashSync(password, hashopt)) {
            //認証
            req.session.authUser = { username: username }
            return res.json({ username: username })
        }else{
            res.status(401).json({ message: 'パスワードが間違っています' })
        }
    }).catch(err => {
        console.log(err)
        res.status(401).json({ message: 'エラーが発生しました' })
    })
})
  
router.post('/logout', (req, res, next) => {
    delete req.session.authUser
    res.json({ ok: true })
})

export default router
