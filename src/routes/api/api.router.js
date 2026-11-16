import { Router } from "express";

import userRouter from "./user.router.js";
import eventRouter from "./event.router.js"


const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from api" })
})

router.use("/user",userRouter);
router.use("/event",eventRouter);


export default router;