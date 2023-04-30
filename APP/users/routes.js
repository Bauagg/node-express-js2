const router = require('express').Router();
const controlerUser = require('./users-controler')

router.get('/users', controlerUser.getUsers)
router.get('/users/:id', controlerUser.getUsersById)
router.post('/users/', controlerUser.postUsers)
router.put('/users/:id', controlerUser.putUsers)
router.delete('/users/:id', controlerUser.deletUsers)


module.exports = router