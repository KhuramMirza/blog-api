import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  const result = await authService.register(req.body);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: result.user,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "Logged in successfully",
    data: {
      user: result.user,
    },
  });
};
