const User = require('./user')
const Ticket = require('./ticket')
const Category = require('./category')
const List = require('./list')
const Organization = require('./organization')

Ticket.belongsTo(User)
User.hasMany(Ticket)

Ticket.belongsTo(List)
List.hasMany(Ticket)

Organization.hasMany(User)
User.belongsTo(Organization)

Organization.hasMany(List)
List.belongsTo(Organization)

Ticket.belongsToMany(Category, {through: 'tags'})
Category.belongsToMany(Ticket, {through: 'tags'})

module.exports = {
  User,
  Ticket,
  Category,
  List,
  Organization
}
