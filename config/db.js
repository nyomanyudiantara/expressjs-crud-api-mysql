const sequelize = require('sequelize');

const db = new sequelize("crud_expressjs", "root", "", {
	dialect: "mysql"
});

db.sync({});


module.exports = db;