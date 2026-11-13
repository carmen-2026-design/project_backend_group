import { Router } from "express";
import registrationViewController from "../../controllers/registrations/registrations.api.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

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


router.post("/:id/delete",registrationViewController.remove)


export default router;