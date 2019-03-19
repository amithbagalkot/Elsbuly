"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var config = require("../config");
const winston = require('winston');
var db = {};
var sequelizeConfig = {
    dialect: "mysql", 
    multipleStatements : true
};
if (config.use_env_variable) {
    var sequelize = new Sequelize(
        process.env[config.use_env_variable],
        config.db.mysql
    );
} else {
    console.log("new sequ");
    var sequelize = new Sequelize(
        config.db.mysql.database,
        config.db.mysql.username,
        config.db.mysql.password,
        config.db.mysql
    );
}
sequelize
  .authenticate()
  .then(() => {
    winston.info('Connection has established with db successfully.');
  })
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach(file => {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
