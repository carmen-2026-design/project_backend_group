import { Router } from "express";
import userRouter from "./user.router.js";
// import eventRouter from "./event.router.js";
 import categoryRouter from "./category.router.js";
// import registrationRouter from "./registration.router.js";


const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1 style='background-color:#0047AB;'>Hello from view</h1>")
})

router.use("/user",userRouter);
// router.use("/event",eventRouter);
router.use("/category",categoryRouter);
// router.use("/registration",registrationRouter);

export default router;