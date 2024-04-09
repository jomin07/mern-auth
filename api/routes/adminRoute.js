import express from 'express';
import { getUsers, signin, signout } from '../controllers/adminController.js';

const router = express.Router();

router.post('/signin', signin);
router.get('/signout', signout);
router.get('/users', getUsers);

export default router;