
import eventRepository from "../../repositories/event.repository.js";


// ------------------ CRUD de event ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async(req,res)=>{
    const event = await  eventRepository.create(req.body);
    res.json({data:event})
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const events = await eventRepository.getAll();
    res.json({ data: events })
};

// endpoint dato individual
const getById = async(req, res) => {
    const id = parseInt(req.params.id);
    const event = await eventRepository.getById(id);
    res.json({ data: event })
};

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async(req,res)=>{
    const id = parseInt(req.params.id);
    const event = await eventRepository.update(id,req.body);
    res.json({data:event});
}

// endpoint para cambiar parte del dato
const modify =async (req,res)=>{
    const id = parseInt(req.params.id);
    const event  = await eventRepository.modify(id,req.body);
    res.json({data:event});
}

// ------------------------ D (Delete)------------

const remove = async(req,res)=>{
    const id  = parseInt(req.params.id);
    const event = await eventRepository.remove(id);
    res.json({data: event})
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}