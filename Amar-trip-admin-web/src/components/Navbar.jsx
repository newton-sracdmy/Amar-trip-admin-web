import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; 
import LoginIcon from "@mui/icons-material/Login"; 
import LogoutIcon from "@mui/icons-material/Logout"; 

const Navbar = ({ toggleDrawer }) => {
  const isLoggedIn = false; 

  return (
    <AppBar position="fixed" sx={{ zIndex: 1301 }}> 
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Avatar sx={{ bgcolor: "white", color: "black", mr: 1 }}>
            <DirectionsCarIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Amar Trip
          </Typography>
        </Box>

        {isLoggedIn ? (
          <Button color="inherit" startIcon={<LogoutIcon />}>Logout</Button>
        ) : (
          <Button color="inherit" sx={{ mr: 5 }} startIcon={<LoginIcon />}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
