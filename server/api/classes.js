import { Router } from 'express'
import Sequelize from 'sequelize'

const router = Router()

const sequelize = new Sequelize('ibird', 'postgres', 'password',{
    host: 'postgres',
    dialect: 'postgres',
})
// const classes = sequelize.define('classes', {
//     name: {
//       type: Sequelize.STRING
//     },
//     douments: {
//         type: Sequelize.JSON
//     }
//   },{
//       timestamps: true
//   });

router.get('/classes', (req, res, next) => {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    res.sendStatus(200)
})

export default router
