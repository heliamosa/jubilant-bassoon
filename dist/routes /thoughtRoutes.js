import express from 'express';
import { getThoughts, createThought, deleteThought } from '../controllers/thoughtController.js';
const router = express.Router();
router.get('/', getThoughts);
router.post('/', createThought);
router.delete('/:thoughtId', deleteThought);
export default router;
