const { Users } = require('../../models')
const bcrypt = require('../../utils/bcrypt')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getUsers = async (req, res, next) => {
    try {
        const { username } = req.query
        let where = {}
        if (username) {
            where = {
                username: {
                    [Op.like]: `%${username}%`
                }
            }
        }
        const user = await Users.findAll({
            where,
            attributes: ['id', 'username', 'email']
        })
        return res.status(200).send({
            error: false,
            message: 'succes',
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const getUsersById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await Users.findOne({
            where: {
                id
            },
            attributes: ['id', 'username', 'email']
        })
        if (!user) throw ({ code: 400, message: 'user not found' })
        return res.status(200).json({
            error: false,
            message: 'succes',
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const postUsers = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const hashedPassword = await bcrypt.hashPassword(password)
        // validatsi
        const exist = await Users.findOne({
            where: {
                email
            },
            select: ['id']
        })
        if (exist) throw ({ code: 400, message: 'email already registered' })
        const user = await Users.create({
            username,
            password: hashedPassword,
            email
        })
        res.status(201).json({
            error: false,
            message: 'succes',
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const putUsers = async (req, res, next) => {
    try {
        const { id } = req.params
        const { username, password, email } = req.body
        const hashedPassword = await bcrypt.hashPassword(password)
        const user = await Users.findByPk(id)
        if (!user) throw ({ code: 400, message: 'user not found' })
        await Users.update({ username, password: hashedPassword, email }, { where: { id } })
        return res.status(201).json({
            error: false,
            message: 'succes',
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const deletUsers = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await Users.findByPk(id)
        if (!user) throw ({ code: 400, message: 'user nod found' })
        await user.destroy()
        return res.status(200).json({
            error: false,
            message: `succes id: ${id} has been deleted`
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUsersById,
    postUsers,
    putUsers,
    deletUsers
}