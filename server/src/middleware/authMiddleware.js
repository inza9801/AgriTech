import jwt from "jsonwebtoken";
import { findUserById } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.user_id);
    if (!user) {
      res.status(401);
      throw new Error("User no longer exists");
    }

    req.user = user; // { user_id, username, email, role, full_name, ... }
    next();
  } catch (err) {
    res.status(401);
    next(new Error("Not authorized, token invalid or expired"));
  }
};

export const protectRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    res.status(403);
    return next(new Error("Forbidden: insufficient role"));
  }
  next();
};