const User = require('./Users');
const Product = require('./Products');

User.hasMany(Product, {
    foreignKey: 'created_by'
});

Product.belongsTo(User, {
    foreignKey: 'created_by'
});

module.exports = { User, Product };