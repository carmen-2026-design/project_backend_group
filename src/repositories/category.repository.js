import { Category } from "../models/testdata.js";


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
    const { categoryId, categoryName, categoryDescription} = data;
    const category = await Category.findByPk(id);
    if (category) {
        category.categoryName = categoryName;
        category.categoryId = categoryId;
        category.categoryDescription = categoryDescription;

        await category.save();
        return category;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { categoryId, categoryName, categoryDescription} = data;
    const category = await Category.findByPk(id);
    if (!category) {
        return null;
    }
    category.categoryName = categoryName || category.categoryName;
    category.categoryId = categoryId || category.categoryId;
    category.categoryDescription = categoryDescription || category.categoryDescription;

    await category.save();
    return category;
}




// ------------------------ D (Delete)------------

/* const remove = async (id) => {
    const category = await Category.findByPk(id);
    if (category) {
        await category.destroy();
        return category;
    }
    return null;
}

 */

const remove = async (id) => {
    try {
        const category = await Category.findByPk(id);
        
        if (category) {
            console.log(category);
            
            await category.destroy();
            return category; // Eliminado con éxito
        }
        
        return null; // No se encontró la categoría
        
    } catch (error) {
        console.error("Error en el repositorio al eliminar la categoría:", error.message);
        
        // Si el error es por una relación (foreign key), lanzamos un mensaje amigable
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new Error("No se puede eliminar esta categoría porque tiene elementos asociados.");
                            console.alert('hola');

        }
        
        // Para cualquier otro error inesperado, lo propagamos
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