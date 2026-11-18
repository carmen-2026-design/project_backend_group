import { Router } from "express";
import registrationViewController from "../../controllers/registration/registration.view.controller.js";

const router = Router();

router.use((req, res, next) => {
    if (req.session.userLogin || req.session.user) {
        return next();
    }
    res.redirect("/auth/login");
});

// ------------------ CRUD de registration ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",registrationViewController.createForm);

// creación de dato
router.post("/",registrationViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",registrationViewController.getAll);

// endpoint dato individual
router.get("/:id", registrationViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",registrationViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",registrationViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/cancel",registrationViewController.cancel);


export default router;