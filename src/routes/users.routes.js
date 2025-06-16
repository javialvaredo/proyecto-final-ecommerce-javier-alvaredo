import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser
} from "../controllers/users.controller.js";

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

export default router;
