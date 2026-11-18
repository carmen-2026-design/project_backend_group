import userRepository from "../../repositories/user.repository.js";

const ROLES = ["user", "admin"];

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
const createForm = (req,res)=>{
    const roles = ["user","admin"]
    res.render("user/create",{roles});
}

// endpoint para crear dato
const create = async (req,res)=>{
    const {userName,userEmail,userPassword,userPasswordRepeat, userRole} = req.body;
    
    // los datos que había escrito, para volver a rellenar el formulario si hay error
    // (las contraseñas no se devuelven nunca)
    const formData = { userName, userEmail, userRole };

    if (!password) {
        return res.render("user/create", { roles: ROLES, user: formData, error: "La contraseña es obligatoria" });
    }
    if (password !== passwordRepeat) {
        return res.render("user/create", { roles: ROLES, user: formData, error: "Las contraseñas no coinciden" });
    }

    try{
        const user = await userRepository.create({userName, userEmail, userPassword, userRole})
        res.redirect("/user/"+user.userId);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).render("user/create", { roles: ROLES, user: formData, error: error.message });
    }
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    try{
        const users = await userRepository.getAll();
        res.render("user/list",{users})
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).render("user/list", { users: [] });
    }
};

// endpoint dato individual
const getById = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const user = await userRepository.getById(id);
        res.render("user/show",{user})
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).render("user/show", { user: null });
    }
};


// ---------------- U (Update) -----------------------------------
const updateForm = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const user = await userRepository.getById(id);
        res.render("user/update", { roles: ROLES, user, error: null });
    }catch (error) {
        console.error(error);
        res.status(error.status || 500).render("user/edit", { roles: ROLES, user: null, error: error.message });
    }
}

// endpoint para cambiar dato por completo
const update = async(req,res)=>{
    const id = parseInt(req.params.id);
    const { userName, userEmail, userPassword, userPasswordRepeat, userRole } = req.body;
    const formData = { userId: id, userName, userEmail, userRole };

    if (userPassword !== userPasswordRepeat) {
        return res.render("user/edit", { roles: ROLES, user: formData, error: "Las contraseñas no coinciden" });
    }
    try {
        const user  = await userRepository.modify(id, { userName, userEmail, userPassword, userRole });
        if(user){
            res.redirect("/user/"+ user.userId);
        }else{
            res.redirect("/user");
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).render("user/edit", { roles: ROLES, user: formData, error: error.message });
    }
}

// ------------------------ D (Delete)------------

const remove = async(req,res)=>{
    try{
        const id  = parseInt(req.params.id);
        const user = await userRepository.getById(id);
        console.log("ID intentando eliminar:", id);
        if (user.userRole == 'user')
        {
            user = await userRepository.remove(id);
            res.redirect("/user");
        }
    }catch (error) {
        console.error(error);
        //res.status(error.status || 500).redirect("/user");
        res.status(error.status || 500).redirect("/");
    }
    
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