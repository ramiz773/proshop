import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";

// Create a new order
// Post /api/orders
// access private
const addOrderItem = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((x) => ({ ...x, product: x._id, _id: undefined })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// Get logged in user order
// GET /api/orders/myorders
// access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// Get order by ID
// GET /api/orders/:id
// access private
const getOrderById = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  console.log("inside get order by id controller");
  const order = await Order.findById(req.params.id).populate("user", "name email");
  console.log(order);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Update order by ID
// GET /api/orders/:id/pay
// private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

// Update order by ID
// GET /api/orders/:id/delivery
// private
const updateOrderToDelivery = asyncHandler(async (req, res) => {
  res.send("update order to delivery");
});

// Update order by ID
// GET /api/orders/
// private
const getAllOders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

// Delete order by ID
const deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  addOrderItem,
  getMyOrders,
  getAllOders,
  getOrderById,
  updateOrderToDelivery,
  updateOrderToPaid,
  deleteOrderById,
};
