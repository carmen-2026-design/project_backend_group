import { Router } from "express";
import eventViewController from "../../controllers/event/events.view.controller.js";


const router  = Router();

// ------------------ CRUD de event ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
// vista de formulario
router.get("/new",eventViewController.createForm);

// creación de dato
router.post("/",eventViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",eventViewController.getAll);

// endpoint dato individual
router.get("/:id", eventViewController.getById)

// ---------------- U (Update) -----------------------------------
// vista de actualización de evento
router.get("/:id/edit",eventViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",eventViewController.update)

// ------------------ Inscribirse (usuario logueado)
router.post("/:id/register",eventViewController.register);

// ------------------------ D (Delete)------------
router.post("/:id/delete",eventViewController.remove)


export default router;