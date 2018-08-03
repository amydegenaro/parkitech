const User = require('./user')
const Ticket = require('./ticket')
const Category = require('./category')

Ticket.belongsTo(User)
User.hasMany(Ticket)

Ticket.belongsToMany(Category, {through: 'tags'})
Category.belongsToMany(Ticket, {through: 'tags'})

module.exports = {
  User,
  Ticket,
  Category
}
