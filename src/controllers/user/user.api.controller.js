import userRepository from "../../repositories/user.repository.js";

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    const user = await userRepository.create(req.body);
    res.json({data:user})
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const users = await userRepository.getAll();
    res.json({ data: users })
};

// endpoint dato individual
const getById = async (req, res) => {
    const user_id = parseInt(req.params.id);
    const user = await userRepository.getById(user_id);
    res.json({ data: user })
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async(req,res)=>{
    const user_id = parseInt(req.params.id);
    const user  = await userRepository.update(user_id, req.body);
    res.json({data:user});
}

// endpoint para cambiar parte del dato
const modify =async (req,res)=>{
    const user_id = parseInt(req.params.id);
    const user  = await userRepository.modify(user_id,req.body);
    res.json({data:user});
}

// ------------------------ D (Delete)------------

const remove = async(req,res)=>{
    const user_id  = parseInt(req.params.id);
    const user = await userRepository.remove(user_id);
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