const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define('list', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = List
