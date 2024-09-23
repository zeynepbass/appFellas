import express from "express"
import { getPosts,CreatePost,Detail} from "../controllers/post.js"

const router=express.Router()

router.get('/appfellas',getPosts);
router.post('/appfellas',CreatePost);
router.get('/detail/:id',Detail);
export default router;