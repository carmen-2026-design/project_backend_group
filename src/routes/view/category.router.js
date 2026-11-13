import { Router } from "express";
import categoryViewController from "../../controllers/category/category.view.controller.js";

const router = Router();

// ------------------ CRUD de category ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",categoryViewController.createForm);

// creación de dato
router.post("/",categoryViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",categoryViewController.getAll);

// endpoint dato individual
router.get("/:id", categoryViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",categoryViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",categoryViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/delete",categoryViewController.remove)


export default router;