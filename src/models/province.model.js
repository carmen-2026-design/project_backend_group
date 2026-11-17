import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Province = connection.define("Province",{
    provinceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    provinceName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
   
    }
},{
    tableName: "provinces",
    timestamps:true, // asegurarse de que tiene created_at, updated_at
    underscored: true,
});

export default Province;