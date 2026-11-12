import { users } from "../../models/testdata.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req,res)=>{
    const user_id =users[users.length-1].user_id + 1
    const {user_name,user_email,user_password,user_role} = req.body;
    const user = {
        user_id,
        user_name,
        user_email,
        user_password,
        user_role
    }
    users.push(user)
    // Esto de abajo es lo mismo porque el nombre de la variable y la clave son iguales, vale?
    //  users.push({
    //     user_id:user_id,
    //     user_name:user_name,
    //     user_email:user_email,
    //     user_password:user_password,
    //     user_role:user_role
    // })
    res.redirect("/user/"+user_id);
}

const createForm = (req,res)=>{
    const roles = ["user","admin"]
    res.render("user/create",{roles});
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.render("user/list",{users})
};

// endpoint dato individual
const getById =(req, res) => {
    const user_id = parseInt(req.params.id);
    const user = users.find(u=>u.user_id===user_id)
    res.render("user/show",{user})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =(req,res)=>{
    const {user_name,user_email,user_password,user_role} = req.body;
    const user_id = req.params.id;
    const user  = users.find(u=>u.user_id===user_id)
    user.user_name = user_name;
    user.user_email = user_email;
    user.user_password = user_password;
    user.user_role = user_role;
    res.redirect("/user/"+user.user_id);
}

const updateForm = (req,res)=>{
    const user_id = req.params.id;
    const user  = users.find(u=>u.user_id===user_id)

    if (!user) {
        return res.status(404).send("Usuario no encontrado");
    }

    res.render("user/update", {user})
}


// ------------------------ D (Delete)------------

const remove =(req,res)=>{
    const user_id  = parseInt(req.params.id);
    const index = users.findIndex(u=>u.user_id === user_id);
    let user;
    if(index > -1){
        user =users.splice(index,1);
    }
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