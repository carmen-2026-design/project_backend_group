import registrationRepository from "../../repositories/registration.repository.js";


// ------------------ CRUD de registration ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req, res) => {
    const {
        userId,
        eventId,
        registrationPeople,
        registrationStatus,
        registrationCancelDate
    } = req.body;

    const registration = await registrationRepository.create({
        userId,
        eventId,
        registrationPeople,
        registrationStatus,
        registrationCancelDate
    });

    res.redirect("/registration/" + registration.registrationId);
};

const createForm = (req, res) => {
    const statuses = ["registered", "cancelled"];
    res.render("registration/create", { statuses });
};


// ------------------ R (Read)---------------------------------------------

// endpoint lista de datos
const getAll = async (req, res) => {
    const { userId, role } = req.session.user;

    const registrations = role === "admin"
        ? await registrationRepository.getAll()
        : await registrationRepository.getAll(userId);

    res.render("registration/list", { registrations });
};

// endpoint dato individual
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.getById(id);
    res.render("registration/show", { registration });
};


// ---------------- U (Update) -----------------------------------

// endpoint para cambiar dato por completo
const update = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.getById(id);

    if (!registration || !canAccess(req.session.user, registration)) {
        return res.redirect("/registration");
    }

    const { registrationPeople } = req.body;
    await registrationRepository.updatePeople(id, registrationPeople);

    res.redirect("/registration/" + id);
};

const updateForm = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.getById(id);

    if (!registration || !canAccess(req.session.user, registration)) {
        return res.redirect("/registration");
    }

    res.render("registration/update", { registration, query: req.query });
};

// ------------------------ D (cancel)------------

const cancel = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.getById(id);

    if (!registration || !canAccess(req.session.user, registration)) {
        return res.redirect("/registration");
    }

    await registrationRepository.cancel(id);
    res.redirect("/registration");
};


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    cancel
};
