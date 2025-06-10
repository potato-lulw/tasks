import express from 'express';
import { isAdmin, protectedRoute } from '../middlewares/authMiddlewares.js';
import { activateUserProfile, changeUserPassword, deleteUserProfile, getNotificationsList, getTeamList, loginUser, logoutUser, markNotificationRead, registerUser, updateUserProfile } from '../controllers/userController.js';


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.use(protectedRoute); // applies to all below

router.get("/notifications", getNotificationsList);
router.put("/profile", updateUserProfile);
router.put("/read-noti", markNotificationRead);
router.put("/change-password", changeUserPassword);


router.use(protectedRoute, isAdmin); // applies to all below

router.get("/get-team", getTeamList);
router
  .route("/:id")
  .put(activateUserProfile)
  .delete(deleteUserProfile);



export default router;