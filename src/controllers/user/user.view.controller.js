import userRepository from "../../repositories/user.repository.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    const {user_name,user_email,user_password,user_role} = req.body;
    const user = await userRepository.create({
        user_name,
        user_email,
        user_password,
        user_role
    })
    res.redirect("/user/"+user.user_id);
}

const createForm = (req,res)=>{
    const roles = ["user","admin"]
    res.render("user/create",{roles});
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const users = await userRepository.getAll();
    res.render("user/list",{users})
};

// endpoint dato individual
const getById = async (req, res) => {
    const user_id = parseInt(req.params.id);
    const user = await userRepository.getById(user_id);
    res.render("user/show",{user})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async(req,res)=>{
    const user_id = parseInt(req.params.id);
    const user  = await userRepository.update(user_id, req.body);
    if(user){
        res.redirect("/user/"+user.user_id);
    }else{
        res.redirect("/user");
    }
}

const updateForm = async(req,res)=>{
    const user_id = parseInt(req.params.id);
    const user = await userRepository.getById(user_id);
    res.render("user/update", {user})
}


// ------------------------ D (Delete)------------

const remove = async(req,res)=>{
    const user_id  = parseInt(req.params.id);
    const user = await userRepository.remove(user_id);
    res.redirect("/user");
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