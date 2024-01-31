import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Ruangan from "./ruangan.js";

const { DataTypes } = Sequelize;

const Booking_Ruangan = db.define('booking_ruangan', {
    id_BookingRuangan: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: async () => {
            const prefix = 'BR_';
            const nextId = await Booking_Ruangan.max('id_BookingRuangan');

            if (nextId === null) {
                return `${prefix}${String(1).padStart(paddingLength, '0')}`;
            } else {
                const currentNumber = parseInt(nextId.split('_')[1]);
                const newNumber = currentNumber + 1;
                return `${prefix}${String(newNumber).padStart(paddingLength, '0')}`;
            }
        }
    },
    pic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Agenda: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    JamMulai: {
        type: DataTypes.TIME,
        allowNull: false
    },
    JamSelesai: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Keterangan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.ENUM('pending', 'tolak', 'setuju'),
        allowNull: false
    }
}, {
    underscored: true,
    freezeTableName: true
});
Booking_Ruangan.belongsTo(Users, { foreignKey: 'username', targetKey: 'username' });
Booking_Ruangan.belongsTo(Ruangan, { foreignKey: 'id_ruangan' });

(async () => {
    await db.sync();
})();

export default Booking_Ruangan;
