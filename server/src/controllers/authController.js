import {
  findUserByEmail,
  findUserByUsername,
  findUserById,
  createUser,
  comparePassword,
  createDriverUser,
  getAllDrivers,
} from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const ALLOWED_SELF_REGISTER_ROLES = ["farmer", "buyer"];

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role, full_name, phone_number, address } = req.body;

    if (!username || !email || !password || !role || !full_name) {
      res.status(400);
      throw new Error("username, email, password, role, and full_name are required");
    }

    if (!ALLOWED_SELF_REGISTER_ROLES.includes(role)) {
      res.status(400);
      throw new Error("Invalid role for self-registration");
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      res.status(409);
      throw new Error("Email already registered");
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      res.status(409);
      throw new Error("Username already taken");
    }

    const user = await createUser({ username, email, password, role, full_name, phone_number, address });
    const token = generateToken(user.user_id, user.role);

    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user.user_id, user.role);

    res.json({
      success: true,
      data: {
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          phone_number: user.phone_number,
          address: user.address,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.user_id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// Admin-only: register a driver (creates users row + drivers row together)
export const registerDriver = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      full_name,
      phone_number,
      address,
      employee_id,
      driver_phone,
      vehicle_number,
      vehicle_type,
      registration_number,
      capacity_tons,
      experience_years,
      joining_date,
    } = req.body;

    if (!username || !email || !password || !full_name) {
      res.status(400);
      throw new Error("username, email, password, and full_name are required");
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      res.status(409);
      throw new Error("Email already registered");
    }

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      res.status(409);
      throw new Error("Username already taken");
    }

    const result = await createDriverUser({
      username,
      email,
      password,
      full_name,
      phone_number,
      address,
      employee_id,
      driver_phone,
      vehicle_number,
      vehicle_type,
      registration_number,
      capacity_tons,
      experience_years,
      joining_date,
    });

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const listDrivers = async (req, res, next) => {
  try {
    const data = await getAllDrivers();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};