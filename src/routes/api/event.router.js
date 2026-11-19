import { Router } from "express";
import eventApiController from "../../controllers/event/event.api.controller.js";



const router = Router();

// ------------------ CRUD de event ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
router.post("/",eventApiController.create)

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",eventApiController.getAll);

// endpoint dato individual
router.get("/:id", eventApiController.getById)

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
router.put("/:id",eventApiController.update)

// endpoint para cambiar parte del dato
router.patch("/:id",eventApiController.modify)

// ------------------------ D (Delete)------------

router.delete("/:id",eventApiController.remove)


export default router;