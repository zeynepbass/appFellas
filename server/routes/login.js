import express from "express"
import { signin,signup } from "../controllers/login.js"

const router=express.Router()
router.post('/signin',signin);
router.post('/register',signup);
export default router;