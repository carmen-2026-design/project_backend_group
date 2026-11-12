import { users } from "../../models/testdata.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req,res)=>{
    const id =users[users.length-1].id + 1
    const {username,email,password,role} = req.body;
    const user = {
        id,
        username,
        email,
        password,
        role
    }
    users.push(user)
    // Esto de abajo es lo mismo porque el nombre de la variable y la clave son iguales, vale?
    //  users.push({
    //     id:id,
    //     username:username,
    //     email:email,
    //     password:password,
    //     role:role
    // })
    res.redirect("/user/"+id);
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
    const id = parseInt(req.params.id);
    const user = users.find(u=>u.id===id)
    res.render("user/show",{user})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =(req,res)=>{
    const {username,email,password,role} = req.body;
    const id = req.params.id;
    const user  = users.find(u=>u.id===id)
    user.username = username;
    user.email = email;
    user.password = password;
    user.role = role;
    res.redirect("/user/"+user.id);
}

const updateForm = (req,res)=>{
    const id = req.params.id;
    const user  = users.find(u=>u.id===id)
    res.render("user/update", {user})
}


// ------------------------ D (Delete)------------

const remove =(req,res)=>{
    const id  = parseInt(req.params.id);
    const index = users.findIndex(u=>u.id === id);
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