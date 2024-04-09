import express from 'express';
import { deleteUser, getUserData, getUsers, signin, signout, updateUserData } from '../controllers/adminController.js';

const router = express.Router();

router.post('/signin', signin);
router.get('/signout', signout);
router.get('/users', getUsers);
router.get('/user/:id', getUserData);
router.post('/userdata/update/:id', updateUserData);
router.delete('/delete-user/:id', deleteUser);

export default router;