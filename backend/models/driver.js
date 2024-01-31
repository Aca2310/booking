import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Driver = db.define('driver',{
    id_driver: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: async () => {
            const prefix = 'D_';
            const paddingLength = 3;
            const nextId = await Ruangan.max('id_ruangan');

            if (nextId === null) {
                return `${prefix}${String(1).padStart(paddingLength, '0')}`;
            } else {
                const currentNumber = parseInt(nextId.split('_')[1]);
                const newNumber = currentNumber + 1;
                return `${prefix}${String(newNumber).padStart(paddingLength, '0')}`;
            }
        }
    },
    nama:{
        type: DataTypes.STRING
    },
    telp:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Driver;