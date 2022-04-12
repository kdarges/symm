import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const router: Router = Router()


// user routes
router.get("/user", getUsers)
router.get("/user/:id", getUser)
router.post("/user", addUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)



export default router