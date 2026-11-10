import { Router } from "express";
import userApiController from "../../controllers/user/user.api.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
router.post("/",userApiController.create)

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",userApiController.getAll);

// endpoint dato individual
router.get("/:id", userApiController.getById)

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
router.put("/:id",userApiController.update)

// endpoint para cambiar parte del dato
router.patch("/:id",userApiController.modify)

// ------------------------ D (Delete)------------

router.delete("/:id",userApiController.remove)


export default router;