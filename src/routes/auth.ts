import { Router } from "express";
import { loginUser, registerUser, whoAmI } from "../controllers/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/whoami", whoAmI);

export default router;
