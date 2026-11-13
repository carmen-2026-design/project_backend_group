import { Event } from "../models/event.model.js";


// ------------------ CRUD de user ----------------------------

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
    const event = await event.findByPk(id);
    // const user = await User.findByPk(id, {
    //     include: {
    //         model: Hero,
    //         as: "heroes",
    //     }
    // });
    return event;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (id, data) => {
    const { event_title,event_description, event_date, event_address, event_postal_code, province_id, event_creator_id, category_id } = data;
    const event = await Event.findByPk(id);
    if (event) {
        event.event_title = event_title;
        event.event_description = event_description;
        event.event_date = event_date;
        event.event_address = event_address;
        event.event_postal_code = event_postal_code;
        event.province_id = province_id;
        event.category_id = category_id;

        await event.save();
        return event;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const {event_title,event_description, event_date, event_address, event_postal_code, province_id, event_creator_id, category_id } = data;
    const event = await Event.findByPk(id);
    if (!event) {
        return null;
    }
    event.event_title = event_title || event.event_title;
    event.event_description = event_description || event.event_description;
    event.event_date = event_date || event.event_date;
    event.event_address = event_address || event.event_address;
    event.event_postal_code = event_postal_code || event.event_postal_code;
    event.province_id = province_id || event.province_id;
    event.category_id = category_id || event.category_id;

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