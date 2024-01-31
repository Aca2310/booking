import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Ruangan = db.define('ruangan', {
    id_ruangan: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: async () => {
            const prefix = 'R_';
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
    nama: {
        type: DataTypes.STRING
    },
    kapasitas: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Ruangan;
