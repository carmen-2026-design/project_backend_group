import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const User = connection.define("User",{
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    role: {
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