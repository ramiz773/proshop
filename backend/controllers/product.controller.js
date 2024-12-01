import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

//  @desc    Fetch all products
// @route GET/api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//  @desc    Fetch single products
// @route GET/api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }

  res.status(404).json({ message: "product not found" });
});

export { getProducts, getProductById };
