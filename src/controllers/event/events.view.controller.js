
import eventRepository from "../../repositories/event.repository.js";


// ------------------ CRUD de event ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    const {eventTitle,eventDescription,eventDate,eventAddress,eventPostalCode,provinceId,userId,categoryId} = req.body;
    const event = await eventRepository.create({
        eventTitle,
        eventDescription,
        eventDate,
        eventAddress,
        eventPostalCode,
        provinceId,
        userId,
        categoryId
    })
    res.redirect("/event/"+event.eventId);
}

const createForm = (req,res)=>{
    res.render("event/create");
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const events = await eventRepository.getAll();
    res.render("event/list",{events})
};

// endpoint dato individual
const getById =async (req, res) => {
    const id = parseInt(req.params.id);
    const event = await eventRepository.getById(id);
    res.render("event/show",{event})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (req,res)=>{
    const id = req.params.id;
    const event  = await eventRepository.update(id,req.body);
    if(event){
        res.redirect("/event/"+event.id);
    }else{
        res.redirect("/event");
    }

}

const updateForm = async (req,res)=>{
    const id = parseInt(req.params.id);
    const event  = await eventRepository.getById(id);
    res.render("event/update", {event})
}


// ------------------------ D (Delete)------------

const remove =async (req,res)=>{
    const id  = parseInt(req.params.id);
    const event = await eventRepository.remove(id);
    res.redirect("/event");
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