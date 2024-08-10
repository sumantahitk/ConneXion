import express from "express";
import { addNewPost ,getAllPost,bookmarkPost,deletePost,addComment,getUserPost,likePost,dislikePost} from "../controllers/post_controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router=express.Router();
router.post("/newpost",isAuthenticated,upload.single('image'),addNewPost);
//  router.route('/newpost').post(isAuthenticated,upload.single('profilePicture'),addNewPost);
router.get("/showpost",isAuthenticated,getUserPost);
router.get("/allpost",isAuthenticated,getAllPost);
router.put('/:id/like', isAuthenticated, likePost);
router.put('/:id/dislike', isAuthenticated, dislikePost);
router.post('/:id/addcomment', isAuthenticated, addComment);
router.delete('/:id/postdelete', isAuthenticated, deletePost);
router.post('/:id/bookmark', isAuthenticated, bookmarkPost);
export default router;