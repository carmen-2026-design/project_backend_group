import registrationRepository from "../../repositories/registration.repository.js";


// ------------------ CRUD de registration ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req, res) => {
    const {
        user_id,
        event_id,
        registration_people,
        registration_status,
        registration_cancel_date
    } = req.body;

    const registration = await registrationRepository.create({
        user_id,
        event_id,
        registration_people,
        registration_status,
        registration_cancel_date
    });

    res.redirect("/registration/" + registration.registration_id);
};

const createForm = (req, res) => {
    const statuses = ["registered", "cancelled"];
    res.render("registration/create", { statuses });
};


// ------------------ R (Read)---------------------------------------------

// endpoint lista de datos
const getAll = async (req, res) => {
    const registrations = await registrationRepository.getAll();
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
    const id = req.params.id;
    const registration = await registrationRepository.update(id, req.body);

    if (registration) {
        res.redirect("/registration/" + registration.registration_id);
    } else {
        res.redirect("/registration");
    }
};

const updateForm = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.getById(id);
    const statuses = ["registered", "cancelled"];

    res.render("registration/update", { registration, statuses });
};


// ------------------------ D (Delete)------------

const remove = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.remove(id);
    res.redirect("/registration");
};


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
};
