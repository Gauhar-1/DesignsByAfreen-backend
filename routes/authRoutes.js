import { Router } from 'express';
const router = Router();
import { register, login, fecthUsers, updateBlock, checkAdmin } from '../controllers/authController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/users',fecthUsers);
router.post('/updateBlock', updateBlock);
router.get('/admin/stats', verifyAdmin, checkAdmin);


export default router;
