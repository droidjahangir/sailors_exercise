import express from 'express';
const router = express.Router();

import {
  createShoppingCard,
  getAllShoppingCard,
  getCardById,
  deleteShoppingCard,
  updateShoppingCard,
} from '../controllers/shoppingCardController.js';

router.route('/').get(getAllShoppingCard).post(createShoppingCard);
router
  .route('/:id')
  .get(getCardById)
  .delete(deleteShoppingCard)
  .put(updateShoppingCard);

export default router;
