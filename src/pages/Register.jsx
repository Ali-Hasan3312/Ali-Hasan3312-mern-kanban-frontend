import {
    Avatar,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import { register } from "../services/authService";

const Register = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("fullName", formData.fullName);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await register(data).then((res)=>{
        console.log("Registration response:", res);
        if (res?.success) {
          toast.success(res?.message);
          localStorage.setItem("token", res?.token);
            setUser(res.user);
            navigate("/dashboard");
          return res?.data;
        }
      }).catch((error)=> {
        toast.error(error?.response?.data?.message);
        console.error("Registration error:", error);
      })
      
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
          Register for Kanban Dashboard
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              size="small"
              required
            />
            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              size="small"
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              size="small"
              required
            />

            <Button component="label" variant="outlined" size="small">
              Upload Profile Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            {imagePreview && (
              <Box display="flex" justifyContent="center">
                <Avatar
                  src={imagePreview}
                  sx={{ width: 72, height: 72, mt: 1 }}
                  alt="Profile Preview"
                />
              </Box>
            )}

            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
