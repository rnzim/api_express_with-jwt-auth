const connection = require('./database')
const Sequelize = require('sequelize')


const User = connection.define('users',{
    user:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    pass:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false})

module.exports = User