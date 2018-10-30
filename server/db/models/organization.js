const Sequelize = require('sequelize')
const db = require('../db')

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Organization
