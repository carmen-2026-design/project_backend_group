import { DataTypes } from "sequelize";
import connection from "../config/db.js";
import bcrypt from "bcrypt";

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

//comprobación del password al ir a crear el usuario
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.userPassword,10);
    console.log("hash",hashedPassword,user.userPassword);
    user.userPassword = hashedPassword;
});

//modificación del password al modificar el password del usuario
User.beforeUpdate(async (user) => {
    if(user.changed("userPassword")){
        const hashedPassword = await bcrypt.hash(user.userPassword,10);
        user.userPassword = hashedPassword;
    }
});

export default User;