import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Event = connection.define("Event",{
    eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    eventTitle:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    eventDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull:false
    },   
    eventAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventPostalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provinceId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull:false
    }

},{
    tableName: "events",
    timestamps:true, // asegurarse de que tiene created_at, updated_at
    underscored: true,
});

export default Event;