import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, role, ... }
      return next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }
  }
  return res.status(401).json({ success: false, message: "Not authorized, no token" });
};

// Usage: protectRole("farmer", "admin")
export const protectRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Forbidden: insufficient role" });
  }
  next();
};
