import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Rides from "./modules/rides/components/Rides";
import Layout from "./components/Layout";
import DriverPanel from "./modules/drivers/Drivers";
import Passengers from "./modules/passengers/passengers";
import Dashboard from "./modules/dashboard/DashBoard";
import RideDetailsPage from "./modules/rides/components/RideDetails";
import LoginPage from "./modules/login/Login";
import DriverDetailsPage from "./modules/drivers/DriverDetails";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            token ? (
              <Layout>
                <Routes>
                  <Route path="/rides" element={<Rides />} />
                  <Route path="/passengers" element={<Passengers />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/rides/:id" element={<RideDetailsPage />} />
                  <Route path="/drivers" element={<DriverPanel />} />
                  <Route path="/users/:id" element={<DriverDetailsPage />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
