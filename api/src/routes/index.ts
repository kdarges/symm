import { Router } from "express";
import { deleteUser, getUsers, login, register } from "../controllers/user";

const router: Router = Router()


// user routes
router.get("/user", getUsers)
router.post("/login", login)
router.post("/register", register)
router.delete("/user/:id", deleteUser)



export default router