// import { User, Hero } from "../models/index.js";
import { Registration } from "../models/registration.model.js";


// ------------------ CRUD de registration ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data) => {
    const registration = await Registration.create(data)
    return registration;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const registration = await Registration.findAll();
    return registration;
};

// endpoint dato individual
const getById = async (id) => {
    const registration = await Registration.findByPk(id);
    return registration;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (id, data) => {
    const { registration_id, user_id, event_id, registration_people, registration_status, registration_cancel_date } = data;
    const registration = await Registration.findByPk(id);
    if (registration) {
        registration.registration_id = registration_id;
        registration.user_id = user_id;
        registration.event_id = event_id;
        registration.registration_people = registration_people;
        registration.registration_status = registration_status;
        registration.registration_cancel_date = registration_cancel_date;
        await registration.save();
        return registration;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { registration_id, user_id, event_id, registration_people, registration_status, registration_cancel_date } = data;
    const registration = await Registration.findByPk(id);
    if (!registration) {
        return null;
    }
        registration.registration_id = registration_id || registration.registration_id;
        registration.user_id = user_id || registration.user_id;
        registration.event_id = event_id || registration.event_id;
        registration.registration_people = registration_people || registration.registration_people;
        registration.registration_status = registration_status || registration.registration_status;
        registration.registration_cancel_date = registration_cancel_date || registration.registration_cancel_date;
    await user.save();
    return user;
}




// ------------------------ D (Delete)------------

const remove = async (id) => {
    const registration = await Registration.findByPk(id);
    if (registration) {
        await registration.destroy();
        return registration;
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