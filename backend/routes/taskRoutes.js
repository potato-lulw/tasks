
import express from 'express';
import { isAdmin, protectedRoute } from '../middlewares/authMiddlewares.js';
import { createSubTask, createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from '../controllers/taskController.js';



const router = express.Router();

router.use(protectedRoute);
router.post('/activity/:id', postTaskActivity);
router.get('/dashboard', dashboardStatistics);
router.get('/', getTasks);
router.get('/duplicate/:id', duplicateTask);
router.get('/:id', getTask);


router.use(protectedRoute, isAdmin);
router.post('/create', createTask);


router.put("/create-subtask/:id", createSubTask);
router.put("/update/:id", updateTask);
router.put("/:id", trashTask);
router.delete("/delete-restore", deleteRestoreTask);
router.delete("/delete-restore/:id", deleteRestoreTask);






export default router;