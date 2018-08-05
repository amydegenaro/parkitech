const Sequelize = require('sequelize')
const db = require('../db')

const Ticket = db.define(
  'ticket',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: Sequelize.ENUM('open', 'assigned', 'closed'),
      defaultValue: 'open'
    },
    priority: {
      type: Sequelize.ENUM('high', 'medium', 'low'),
      defaultValue: 'low'
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: {min: -90, max: 90}
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: {min: -180, max: 180}
    }
  },
  {
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error(
            'Require either both latitude and longitude or neither'
          )
        }
      }
    }
  }
)

module.exports = Ticket
