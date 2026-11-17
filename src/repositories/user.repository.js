import { User } from "../models/testdata.js";
import { NotFoundError, throwError } from "../utils/errors.js";

// Nunca devolvemos la contraseña al leer usuarios
const PUBLIC_ATTRIBUTES = { exclude: ["password"] };

// Quita la contraseña de un usuario recién creado o modificado
// (create y save devuelven el objeto completo, con la contraseña)
const withoutPassword = (user) => {
    const { password, ...rest } = user.toJSON();
    return rest;
}

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
/**
 * @typedef {Object} UserData
 * @property {string} userName - Nombre del usuario
 * @property {string} userEmail - email del usuario
 * @property {string} userPassword - contraseña
 * @property {string} userRole - rol: "user" o "admin"
 */

/**
 * Crear un nuevo usuario
 * @param {UserData} data - datos del usuario
 * @returns {User} - sin contraseña
 * @throws {Error} - lanza excepción si ocurre un error al crear usuario
 * 
 * @example
 * create ({userName: 'Admin JoinUp', userEmail: 'admin@joinup.com' , userPassword: , userRole: 'admin' })
 */
const create = async (data) => {
    try{
        const user = await User.create(data)
        return withoutPassword(user);
    } catch (error) {
        console.error(error);
        throwError(error);
    }
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    try{
        const users = await User.findAll();
        return users;
    } catch (error) {
        throwError(error);
    }
};

// endpoint dato individual
const getById = async (id) => {
    try{
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throwError(error);
    }
};

const getByEmail = async (userEmail) => {
    try{
        const user = await User.findOne({where: {userEmail}});
        return user;
    } catch (error) {
        throwError(error);
    }
};

const getByUsername = async (userName) => {
    try{
        const user = await User.findOne({where: {userName}});
        return user;
    } catch (error) {
        console.error(error);
        throwError(error);
    }
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (id, data) => {
    try{
        const { userName, userEmail, userPassword, userRole } = data;
        const user = await User.findByPk(id);
        if (user) {
            user.userName = userName;
            user.userEmail = userEmail;
            user.userPassword = userPassword;
            user.useRole = userRole;
            await user.save();
            //return user;
            return withoutPassword(user);
        } else {
            return null;
        }
    }catch(error){
        console.error(error);
        throwError(error);
    }

}

const modify = async (id, data) => {
    try{
        const { userName, userEmail, userPassword, useRole } = data;
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        user.userName = userName || user.userName;
        user.userEmail = userEmail || user.userEmail;
        user.userPassword = userPassword || user.userPassword;
        user.useRole = useRole ?? user.useRole;
        await user.save();
        //return user;
        return withoutPassword(user);
    } catch (error) {
        console.error(error);
        throwError(error);
    }
}


// ------------------------ D (Delete)------------

const remove = async (id) => {
    try{
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            //return user;
            return withoutPassword(user);
        }
        throw new NotFoundError("El usuario no existe");
        //return null;
    } catch (error){
        console.error(error);
        throwError(error);
        // if (error.name === 'SequelizeDatabaseError'){
        //     console.error("No se puede eliminar el usuario porque tiene eventos o registros asociados");
        //     redirect(res, "/", {error:"No se puede eliminar el usuario porque tiene eventos o registros asociados"})
        // }
        // else
        //     throw error;
    }
}


export default {
    create,
    getAll,
    getById,
    getByEmail,
    getByUsername,
    update,
    modify,
    remove
}