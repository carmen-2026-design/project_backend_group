import { Router } from "express";
import userViewController from "../../controllers/user/user.view.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
// vista de formulario
router.get("/new",userViewController.createForm);

// creación de dato
router.post("/",userViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",userViewController.getAll);

// endpoint dato individual
router.get("/:id", userViewController.getById)

// ---------------- U (Update) -----------------------------------
// vista de actualización de usuario
router.get("/:id/edit",userViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",userViewController.update)

// ------------------------ D (Delete)------------
router.post("/:id/delete",userViewController.remove)


export default router;