import express from 'express';
import { getUserData, getUsers, signin, signout, updateUserData } from '../controllers/adminController.js';

const router = express.Router();

router.post('/signin', signin);
router.get('/signout', signout);
router.get('/users', getUsers);
router.get('/user/:id', getUserData);
router.post('/userdata/update/:id', updateUserData);

export default router;