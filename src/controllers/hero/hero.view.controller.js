
import { heroes } from "../../models/index.js";


// ------------------ CRUD de heroe ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req,res)=>{
    const id = heroes[heroes.length-1].id + 1
    const {name,description,utility_level,user_id} = req.body;
    const heroe = {
        id,
        name,
        description,
        utility_level,
        user_id
    }
    heroes.push(heroe)
    // Esto de abajo es lo mismo porque el nombre de la variable y la clave son iguales, vale?
    //  heroes.push({
    //     id:id,
    //     heroename:heroename,
    //     email:email,
    //     password:password,
    //     role:role
    // })
    res.redirect("/hero/"+id);
}

const createForm = (req,res)=>{
    const userId = 1 // después vendrá del middleware
    res.render("hero/create",{user_id:userId});
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.render("hero/list",{heroes})
};

// endpoint dato individual
const getById =(req, res) => {
    const id = parseInt(req.params.id);
    const hero = heroes.find(u=>u.id === id)
    res.render("hero/show",{hero})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =(req,res)=>{
    const {name,description,utility_level} = req.body;
    const id = req.params.id;
    const heroe  = heroes.find(u=>u.id===id)
    heroe.name = name;
    heroe.description = description;
    heroe.utility_level =utility_level;
    res.redirect("/hero/"+heroe.id);
}

const updateForm = (req,res)=>{
    const id = req.params.id;
    const hero  = heroes.find(u=>u.id===id)
    res.render("hero/update", {hero})
}


// ------------------------ D (Delete)------------

const remove =(req,res)=>{
    const id  = parseInt(req.params.id);
    const index = heroes.findIndex(u=>u.id === id);
    let heroe;
    if(index > -1){
        heroe =heroes.splice(index,1);
    }
    res.redirect("/hero");
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