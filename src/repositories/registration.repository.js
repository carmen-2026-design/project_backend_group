import { Registration, Event } from "../models/testdata.js";



// ------------------ CRUD de registration ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data) => {
    const registration = await Registration.create(data)
    return registration;
}

// busca la inscripción de un usuario en un evento concreto
const getByUserAndEvent = async (userId, eventId) => {
    return await Registration.findOne({ where: { userId, eventId } });
};

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async (userId = null) => {
    const where = userId ? { userId } : {};
    const registrations = await Registration.findAll({
        where,
        include: {
            model: Event,
            as: "event",
            attributes: ["eventTitle", "eventDescription"]

        }
    });
    return registrations;
};

// endpoint dato individual
const getById = async (id) => {
    const registration = await Registration.findByPk(id, {
        include: {
            model: Event,
            as: "event",
            attributes: ["eventTitle", "eventDescription"]

        }
    });
    return registration;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (id, data) => {
    const { userId, eventId, registrationPeople, registrationStatus, registrationCancelDate } = data;
    const registration = await Registration.findByPk(id);
    if (registration) {
        registration.userId = userId;
        registration.eventId = eventId;
        registration.registrationPeople = registrationPeople;
        registration.registrationStatus = registrationStatus;
        registration.registrationCancelDate = registrationCancelDate || null;
        await registration.save();
        return registration;
    } else {
        return null;
    }

}

const modify = async (id, data) => {
    const { userId, eventId, registrationPeople, registrationStatus, registrationCancelDate } = data;
    const registration = await Registration.findByPk(id);
    if (!registration) {
        return null;
    }
    registration.userId = userId || registration.userId;
    registration.eventId = eventId || registration.eventId;
    registration.registrationPeople = registrationPeople || registration.registrationPeople;
    registration.registrationStatus = registrationStatus || registration.registrationStatus;
    registration.registrationCancelDate = registrationCancelDate || registration.registrationCancelDate;
    await registration.save();
    return registration;
}

const cancel = async (id) => {
    const registration = await Registration.findByPk(id);
    if (!registration) {
        return null;
    }
    registration.registrationStatus = "cancelled";
    registration.registrationCancelDate = new Date();
    await registration.save();
    return registration;
};

const updatePeople = async (id, registrationPeople) => {
    const registration = await Registration.findByPk(id);
    if (!registration) {
        return null;
    }
    registration.registrationPeople = registrationPeople;
    await registration.save();
    return registration;
};

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
    remove,
    cancel,
    updatePeople,
    getByUserAndEvent
}