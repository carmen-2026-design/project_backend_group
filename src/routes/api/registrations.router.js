import { Router } from "express";
import registrationApiController from "../../controllers/registrations/registrations.api.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
router.post("/",registrationApiController.create)

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",registrationApiController.getAll);

// endpoint dato individual
router.get("/:id", registrationApiController.getById)

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
router.put("/:id",registrationApiController.update)

// endpoint para cambiar parte del dato
router.patch("/:id",registrationApiController.modify)

// ------------------------ D (Delete)------------

router.delete("/:id",registrationApiController.remove)


export default router;