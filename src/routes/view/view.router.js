import { Router } from "express";
import userRouter from "./user.router.js";
// import eventRouter from "./event.router.js";
 import categoryRouter from "./category.router.js";
import registrationRouter from "./registration.router.js";
import authRouter from "./auth.router.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router  = Router();

router.get("/", (req, res) => {
    res.render("index");
})

router.use("/user",userRouter);
//router.use("/user",isAuthenticated,userRouter);
// router.use("/event",eventRouter);
router.use("/category",categoryRouter);
router.use("/registration",registrationRouter);
router.use("/auth", authRouter);

export default router;