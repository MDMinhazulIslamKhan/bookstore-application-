import express from "express";
import { login, registration } from "../../../controllers/common/index.js";

const router = express.Router();

// registration
router.post('/registration', registration);

// login
router.get('/login', login);


export default router;