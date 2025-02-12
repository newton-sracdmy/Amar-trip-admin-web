import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const drawerWidth = 180;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ position: "fixed", width: "100%", zIndex: 1300 }}>
        <Navbar toggleDrawer={toggleDrawer} />
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: drawerWidth,
            zIndex: 1200, 
          }}
        >
          <Sidebar />
        </Box>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "none" },
            [`& .MuiDrawer-paper`]: { width: drawerWidth, zIndex: 1200 },
          }}
        >
          <Sidebar />
        </Drawer>

        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
