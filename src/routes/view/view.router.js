import { Router } from "express";
import userRouter from "./user.router.js";


const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1 style='background-color:#fabada;'>Hello from view</h1>")
})

router.use("/user",userRouter);


export default router;