import { Router } from "express";
import heroViewController from "../../controllers/hero/hero.view.controller.js";

const router = Router();

// ------------------ CRUD de hero ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",heroViewController.createForm);

// creación de dato
router.post("/",heroViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",heroViewController.getAll);

// endpoint dato individual
router.get("/:id", heroViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",heroViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",heroViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/delete",heroViewController.remove)


export default router;