import bcrypt from "bcrypt";
import userRepository from "../../repositories/user.repository.js";

function redirect(res,url,data = {}){
    const urlSearchParams = new URLSearchParams();
    for(const key in data){
        urlSearchParams.append(key,data[key]);
    }
    res.redirect(url+"?"+urlSearchParams.toString())
}

const registerForm = async(req, res) => {
    res.render("auth/register")
}

const register = async (req,res)=>{
    const {userName,userEmail,userPassword, userPasswordRepeat} = req.body;
    const userRole = "user";

    if (userPassword !== userPasswordRepeat){
        redirect(res, "/auth/register", {error:"Las contraseñas no coinciden"})
        return;
    }

    try {

        let oldUser = await userRepository.getByEmail(userEmail);
        if (oldUser){
            redirect(res, "/auth/register", {error:"Ya existe un usuario con ese email"})
            return;
        }
        oldUser = await userRepository.getByUsername(userName);
        if (oldUser){
            redirect(res, "/auth/register", {error:"Ya existe un usuario con ese nombre"})
            return;
        }

        const user = await userRepository.create({userName,userEmail,userPassword,userRole})
        redirect(res,"/auth/login", {message:"El usuario se ha registrado correctamente"});
    }
    catch (error){
        console.error(error);
        redirect(res, "auth/register", {error:"Error al registrarse"})
    }
}

const loginForm = async (req, res) => {
    res.render("auth/login")
}

const login = async (req,res)=>{
    const {userEmail,userPassword,userRole} = req.body;

    try {

        const user = await userRepository.getByEmail(userEmail);
        if (!user){
            return redirect(res, "/auth/login", {error:"Credenciales incorrectas"})
        }
        console.log(user, userPassword, userRole);
        const compare = await bcrypt.compare(userPassword, user.userPassword);
        console.log(compare);
        if (!compare){
            return redirect(res, "auth/login", {error:"Credenciales incorrectas"})
        }
        req.session.userLogin = {userId:user.userId, userName:user.userName, userRole:user.userRole};
        redirect(res, "/", {message:"El usuario se ha logeado correctamente"})
    }
    catch (error){
        console.error(error);
        redirect(res, "auth/login", {error:"Error al logearse"})
    }
}

const logout= async(req, res) => {
    try{
        req.session.destroy();
        redirect(res, "/", {message:"El usuario se ha deslogeado correctamente"})
    }
    catch (error) {
        console.error(error);
        redirect(res, "/", {error:"Error al deslogearse"})
    }
}

export default {
    registerForm,
    register, 
    loginForm,
    login,
    logout 
}