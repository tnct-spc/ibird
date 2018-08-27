import { Router } from 'express'
import Sequelize from 'sequelize'
import parser from 'body-parser'

const router = Router()
router.use(parser.urlencoded({ extended: false }));
router.use(parser.json());

const sequelize = new Sequelize('ibird', 'postgres', 'password', {
    host: 'postgres',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
})
router.post('/login', (req, res, next) => {
    if (req.body.username === 'demo' && req.body.password === 'demo') {
      req.session.authUser = { username: 'demo' }
      return res.json({ username: 'demo' })
    }
    res.status(401).json({ message: 'Bad credentials' })
})
  
router.post('/logout', (req, res, next) => {
    delete req.session.authUser
    res.json({ ok: true })
})

export default router
