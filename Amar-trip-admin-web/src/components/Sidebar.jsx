import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PaymentIcon from "@mui/icons-material/Payment";

const drawerWidth = 200;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Passengers", icon: <PeopleIcon />, path: "/passengers" },
    { text: "Drivers", icon: <DirectionsCarIcon />, path: "/drivers" },
    { text: "Ride List", icon: <ListAltIcon />, path: "/rides" },
    { text: "Payments", icon: <PaymentIcon />, path: "/payments" },
  ];

  const isActive = (path) => {
    return (
      location.pathname.startsWith(path) || 
      (location.pathname.startsWith("/users/") && location.state?.parent === path.replace("/", ""))
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor: isActive(item.path) ? "#1976d2" : "transparent",
              color: isActive(item.path) ? "white" : "inherit",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? "white" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
