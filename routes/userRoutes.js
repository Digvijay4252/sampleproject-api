import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/userController";
import { createUserValidation } from "../validations/userValidation";

router.post("/users", createUserValidation, createUser);

export default router;
