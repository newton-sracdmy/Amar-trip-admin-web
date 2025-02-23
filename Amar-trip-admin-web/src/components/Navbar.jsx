import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; 
import LoginIcon from "@mui/icons-material/Login"; 
import LogoutIcon from "@mui/icons-material/Logout"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../modules/login/reducer";

const Navbar = ({ toggleDrawer }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <AppBar position="fixed" sx={{ zIndex: 1301, bgcolor: "black", color: "white" }}> 
  <Toolbar>
    <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ display: { sm: "none" } }}>
      <MenuIcon />
    </IconButton>

    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      <Avatar sx={{ bgcolor: "white", color: "black", mr: 1 }}>
        <DirectionsCarIcon />
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
        Amar Trip
      </Typography>
    </Box>

    <Button color="inherit" onClick={handleLogout} sx={{ mr: 5, color: "white" }} startIcon={<LogoutIcon />}>
      Logout
    </Button>
  </Toolbar>
</AppBar>

  );
};

export default Navbar;
