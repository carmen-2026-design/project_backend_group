import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Registration = connection.define("Registration", {
    registrationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    registrationPeople: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    registrationStatus: {
        type: DataTypes.ENUM("registered", "cancelled"),
        allowNull: false,
        defaultValue: "registered"
    },
    registrationCancelDate: {
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
