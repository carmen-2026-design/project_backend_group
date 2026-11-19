
import categoryRepository from "../../repositories/category.repository.js";


// ------------------ CRUD de category ----------------------------

// ------------------ C (Create)
// endpoint para crear dato



const create = async (req,res)=>{

    const category = await categoryRepository.create({...req.body,categoryId:1})
    res.redirect("/category/"+category.categoryId);
}

const createForm = (req,res)=>{
    res.render("category/create");
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const categories = await categoryRepository.getAll();
    res.render("category/list",{categories})
};

// endpoint dato individual
const getById =async (req, res) => {
    const id = parseInt(req.params.id);
    const category = await categoryRepository.getById(id);
    res.render("category/show",{category})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (req,res)=>{
    const id =parseInt(req.params.id);
    const category  = await categoryRepository.update(id,req.body);
    if(category){
        res.redirect("/category/"+category.categoryId);
    }else{
        res.redirect("/category");
    }

}

const updateForm = async (req,res)=>{
    const id = parseInt(req.params.id);
    const category  = await categoryRepository.getById(id);
    res.render("category/update", {category})
}


// ------------------------ D (Delete)------------

/* const remove =async (req,res)=>{
    const id  = parseInt(req.params.id);
    const category = await categoryRepository.remove(id);
    res.redirect("/category");
} */

// ------------------------- D (Delete) -------------------------

const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        // Validación extra por si el ID no es un número
        if (isNaN(id)) {
            return res.redirect("/category");
        }

        await categoryRepository.remove(id);
        res.redirect("/category");
        
    } catch (error) {
        console.error("Error al eliminar la categoría:", error.message);
        
        // Evita que la app se rompa y redirige de vuelta (puedes pasar un query param para mostrar una alerta en la vista)
        res.redirect("/category?error=No se puede eliminar una categoria que tenga un evento programado");
    }
}

export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
}