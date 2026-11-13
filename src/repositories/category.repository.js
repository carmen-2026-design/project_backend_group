import { Category } from "../models/index.js";


// ------------------ CRUD de category ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data) => {
    const category = await Category.create(data)
    return category;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const categories = await Category.findAll();
    return categories;
};

// endpoint dato individual
const getById = async (id) => {
    const category = await Category.findByPk(id);

    return category;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo

const update = async (id, data) => {
    const { category_id, category_name, category_description} = data;
    const category = await Category.findByPk(id);
    if (category) {
        category.category_name = category_name;
        category.category_id = category_id;
        category.category_description = category_description;

        await category.save();
        return category;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { category_id, category_name, category_description} = data;
    const category = await Category.findByPk(id);
    if (!category) {
        return null;
    }
    category.category_name = category_name || category.category_name;
    category.category_id = category_id || category.category_id;
    category.category_description = category_description || category.category_description;

    await category.save();
    return category;
}




// ------------------------ D (Delete)------------

const remove = async (id) => {
    const category = await Category.findByPk(id);
    if (category) {
        await category.destroy();
        return category;
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