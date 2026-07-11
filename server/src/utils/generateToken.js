import jwt from "jsonwebtoken";

const generateToken = (user_id, role) => {
  return jwt.sign({ user_id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;