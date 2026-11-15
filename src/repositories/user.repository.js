import { User } from "../models/testdata.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data) => {
    const user = await User.create(data)
    return user;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const users = await User.findAll();
    return users;
};

// endpoint dato individual
const getById = async (id) => {
    const user = await User.findByPk(id);
   
    return user;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (id, data) => {
    const { userName, userEmail, userPassword, useRole } = data;
    const user = await User.findByPk(id);
    if (user) {
        user.userName = userName;
        user.userEmail = userEmail;
        user.userPassword = userPassword;
        user.useRole = useRole;
        await user.save();
        return user;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { userName, userEmail, userPassword, useRole } = data;
    const user = await User.findByPk(id);
    if (!user) {
        return null;
    }
    user.userName = userName || user.userName;
    user.userEmail = userEmail || user.userEmail;
    user.userPassword = userPassword || user.userPassword;
    user.useRole = useRole || user.useRole;
    await user.save();
    return user;
}


// ------------------------ D (Delete)------------

const remove = async (id) => {
    try{
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return user;
        }
        return null;
    } catch (error){
        if (error.name === 'SequelizeDatabaseError'){
            console.log("No se puede eliminar el usuario porque tiene eventos o registros asociados.");
        }
        else
            throw error;
    }
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}