import { getAllProducts, getProductById, createProduct } from "../models/productModel.js";

export const listProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await createProduct({
      farmer_id: req.user.id,
      name,
      description,
      price,
      quantity,
    });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};
