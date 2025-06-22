import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { login } from "../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password });
      toast.success(userData.message);
      localStorage.setItem("token", userData.token);
      setUser(userData.user);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} align="center" fontWeight={600}>
          Sign in to Kanban Dashboard
        </Typography>

        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              size="small"
            />
            <Button type="submit" variant="contained" fullWidth>
              Sign in
            </Button>
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}
              >
                Register
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
