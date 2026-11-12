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
    res.json({data:user})
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.json({ data: users })
};

// endpoint dato individual
const getById =(req, res) => {
    const user_id = parseInt(req.params.id);
    const user = users.find(u=>u.user_id===user_id)
    res.json({ data: user })
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
    res.json({data:user});
}

// endpoint para cambiar parte del dato
const modify =(req,res)=>{
    const {user_name,user_email,user_password,user_role} = req.body;
    const user_id = req.params.id;
    const user  = users.find(u=>u.user_id===user_id)

    user.user_name = user_name || user.user_name;
    user.user_email = user_email || user.user_email;
    user.user_password = user_password || user.user_password;
    user.user_role = user_role || user.user_role;
    res.json({data:user});
}

// ------------------------ D (Delete)------------

const remove =(req,res)=>{
    const user_id  = parseInt(req.params.id);
    const index = users.findIndex(u=>u.user_id === user_id);
    let user;
    if(index > -1){
        user =users.splice(index,1);
    }
    res.json({data: user})
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}