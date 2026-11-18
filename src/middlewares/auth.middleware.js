const isAuthenticated = async(req,res,next) =>{
    if(req.session.userLogin){
        return next();
    }

    res.redirect("/auth/login");
    
}

const isAdmin = async(req, res, next)=> {
    if(req.session.userLogin.userRole === "admin"){
        return next();
    }
        res.redirect("/auth/login");

}

export {
    isAuthenticated,
    isAdmin
}