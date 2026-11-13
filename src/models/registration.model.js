import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Registration = connection.define("Registration", {
    registration_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    registration_people: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    registration_status: {
        type: DataTypes.ENUM("registered", "cancelled"),
        allowNull: false,
        defaultValue: "registered"
    },
    registration_cancel_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: "registrations",
    timestamps: true,
    underscored: true
});

export default Registration;
