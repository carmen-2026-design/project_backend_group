import registrationRepository from "../../repositories/registration.repository.js";


// ------------------ CRUD de registration ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req, res) => {
    const registration = await registrationRepository.create(req.body);
    res.json({ data: registration });
};


// ------------------ R (Read)---------------------------------------------

// endpoint lista de datos
const getAll = async (req, res) => {
    const registrations = await registrationRepository.getAll();
    res.json({ data: registrations });
};

// endpoint dato individual
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.getById(id);
    res.json({ data: registration });
};


// ---------------- U (Update) -----------------------------------

// endpoint para cambiar dato por completo
const update = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.update(id, req.body);
    res.json({ data: registration });
};

// endpoint para cambiar parte del dato
const modify = async (req, res) => {
    const id = parseInt(req.params.id);
    const registration = await registrationRepository.modify(id, req.body);
    res.json({ data: registration });
};


// ------------------------ D (Delete)------------

const remove = async (req, res) => {
    const id = parseInt(req.params.id);
    await registrationRepository.remove(id);
    res.json({ data: "Registration deleted" });
};


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
};
