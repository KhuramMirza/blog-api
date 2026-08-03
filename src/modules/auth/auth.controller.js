import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  const result = await authService.register(req.body);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: result.user,
      token: result.token,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  return res.status(201).json({
    success: true,
    message: "Logged in successfully",
    data: {
      user: result.user,
      token: result.token,
    },
  });
};
