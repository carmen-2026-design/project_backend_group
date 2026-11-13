import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const User = connection.define("User",{
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull:false
    },
    userRole: {
        type: DataTypes.ENUM("admin","user"),
        defaultValue: "user",
        allowNull: false
    }
},{
    tableName: "users",
    timestamps:true, // asegurarse de que tiene created_at, updated_at
    underscored: true,
});

export default User;