import { Router } from "express";
import userRouter from "./user.router.js";
// import heroRouter from "./hero.router.js";

const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1 style='background-color:#fabada;'>Hello from view</h1>")
})

router.use("/user",userRouter);
// router.use("/hero",heroRouter);

export default router;