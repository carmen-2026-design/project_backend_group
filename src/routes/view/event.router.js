import { Router } from "express";
import eventRouter from "./event.router.js";


const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1 style='background-color:#fabada;'>Hello from view</h1>")
})

router.use("/event",eventRouter);


export default router;