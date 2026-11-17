import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Category = connection.define("Category",{
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    categoryDescription: {
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