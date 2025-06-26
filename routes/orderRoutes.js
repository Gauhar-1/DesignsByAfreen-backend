import { addOrder, getOrders, updatePaymentStatus, updateShippingStatus } from '../controllers/orderController.js';
import { Router } from 'express';
const router = Router();

// Get all products
router.get('/', getOrders);

// Add a new product
router.post('/', addOrder);

// Update shipping status of an order
router.put('/shipping-status', updateShippingStatus);

// Update payment status of an order
router.put('/payment-status', updatePaymentStatus);

export default router;

