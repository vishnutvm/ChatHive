import express from 'express';
const router = express.Router();

// contorllers
import { login, register } from '../../controllers/userControllers';

// user api

router.post('/register', register);
router.post('/login', login);

export default router;
