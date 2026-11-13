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
    const { username, email, password, role } = data;
    const user = await User.findByPk(id);
    if (user) {
        user.username = username;
        user.email = email;
        user.password = password;
        user.role = role;
        await user.save();
        return user;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { username, email, password, role } = data;
    const user = await User.findByPk(id);
    if (!user) {
        return null;
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;
    await user.save();
    return user;
}




// ------------------------ D (Delete)------------

const remove = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return user;
    }
    return null;
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}