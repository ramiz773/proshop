import express from "express";
import {
  addOrderItem,
  getMyOrders,
  getAllOders,
  getOrderById,
  updateOrderToDelivery,
  updateOrderToPaid,
} from "../controllers/Order.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItem).get(protect, admin, getAllOders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivery);

export default router;
