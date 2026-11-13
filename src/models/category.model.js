import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Category = connection.define("Category",{
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category_description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    
},{
    tableName: "categories",
    timestamps:true, // asegurarse de que tiene created_at, updated_at
    underscored: true,
});

export default Category;