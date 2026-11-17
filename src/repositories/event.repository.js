import { Event } from "../models/testdata.js";


// ------------------ CRUD de event ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data) => {
    const event = await Event.create(data)
    return event;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const events = await Event.findAll();
    return events;
};

// endpoint dato individual
const getById = async (id) => {
    const event = await Event.findByPk(id);
 
    return event;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (id, data) => {
    const { eventTitle,eventDescription, eventDate, eventAddress, eventPostalCode, provinceId, categoryId } = data;
    const event = await Event.findByPk(id);
    if (event) {
        event.eventTitle = eventTitle;
        event.eventDescription = eventDescription;
        event.event_date = event_date;
        event.eventAddress = eventAddress;
        event.eventPostalCode = eventPostalCode;
        event.provinceId = provinceId;
        event.categoryId = categoryId;

        await event.save();
        return event;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const {eventTitle,eventDescription, event_date, eventAddress, eventPostalCode, provinceId, categoryId } = data;
    const event = await Event.findByPk(id);
    if (!event) {
        return null;
    }
    event.eventTitle = eventTitle || event.eventTitle;
    event.eventDescription = eventDescription || event.eventDescription;
    event.event_date = event_date || event.event_date;
    event.eventAddress = eventAddress || event.eventAddress;
    event.eventPostalCode = eventPostalCode || event.eventPostalCode;
    event.provinceId = provinceId || event.provinceId;
    event.categoryId = categoryId || event.categoryId;

    await event.save();
    return event;
}




// ------------------------ D (Delete)------------

const remove = async (id) => {
    const event = await Event.findByPk(id);
    if (event) {
        await event.destroy();
        return event;
    }
    return null;
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}