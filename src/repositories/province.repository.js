import { Province } from "../models/testdata.js";


// ------------------ CRUD de province ----------------------------

// ------------------ C (Create)
// endpoint para crear dato


const create = async (data) => {
    const province = await Province.create(data)
    return province;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const provinces = await Province.findAll();
    return provinces;
};

// endpoint dato individual
const getById = async (id) => {
    const province = await Province.findByPk(id);

    return province;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo

const update = async (id, data) => {
    const {  provinceName} = data;
    console.log("-----------------\n",id)
    const province = await Province.findByPk(id);
    if (province) {
        province.provinceName = provinceName;

        await province.save();
        return province;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { provinceId, provinceName} = data;
    const province = await Province.findByPk(id);
    if (!province) {
        return null;
    }
    province.provinceId = provinceId || province.provinceId;
    province.provinceName = provinceName || province.provinceName;
 

    await province.save();
    return province;
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
        const province = await Province.findByPk(id);
        
        if (province) {
            console.log(province);
            
            await province.destroy();
            return province; // Eliminado con éxito
        }
        
        return null; // No se encontró la categoría
        
    } catch (error) {
        console.error("Error en el repositorio al eliminar la provincia:", error.message);
        
        // Si el error es por una relación (foreign key), lanzamos un mensaje amigable
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new Error("No se puede eliminar esta provincia porque tiene elementos asociados.");
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