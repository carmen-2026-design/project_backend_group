import { categories } from "../../models/testdata.js";


// ------------------ CRUD de category ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req,res)=>{
    const category_id =categories[categories.length-1].category_id + 1
    const {category_name, category_description} = req.body;
    const category = {
        category_id,
        category_name,
        category_description

    }
    categories.push(category)

    res.json({data:category})
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.json({ data: categories })
};

// endpoint dato individual
const getById =(req, res) => {
    const category_id = parseInt(req.params.id);
    const category = categories.find(u=>u.category_id===category_id)
    res.json({ data: category })
};



// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =(req,res)=>{
    const {category_name, category_description} = req.body;
    const category_id = req.params.id;
    const category  = categories.find(u=>u.category_id===category_id)

    category.category_name = category_name;
    category.category_description = category_description;

    res.json({data:category});
}

// endpoint para cambiar parte del dato
const modify =(req,res)=>{
    const {category_name, category_description} = req.body;
    const category_id = req.params.id;
    const category  = categories.find(u=>u.category_id===category_id)

    category.category_name = category_name || category.category_name;
    category.category_id = category_id || category.category_id;
    category.category_description = category_description || category.category_description;

    res.json({data:category});
}

// ------------------------ D (Delete)------------

const remove =(req,res)=>{
    const category_id  = parseInt(req.params.id);
    const index = categories.findIndex(u=>u.category_id === category_id);
    let category;
    if(index > -1){
        category =categories.splice(index,1);
    }
    res.json({data: category})
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}