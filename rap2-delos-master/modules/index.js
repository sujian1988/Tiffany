var sequelize = require('../config/sequelize').sequelize();
var User = sequelize.import('./user');

sequelize.sync();

exports.User = User;