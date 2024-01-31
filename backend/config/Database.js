import {Sequelize} from "sequelize";

const db = new Sequelize('sisi','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;