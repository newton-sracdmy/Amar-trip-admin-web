import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rides from "./modules/rides/components/Rides";
import Layout from "./components/Layout";
import DriverPanel from "./modules/drivers/drivers";
import Passengers from "./modules/passengers/passengers";
import Dashboard from "./modules/dashboard/DashBoard";
import RideDetailsPage from "./modules/rides/components/RideDetails";
import LoginPage from "./modules/login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/rides" element={<Rides />} />
                <Route path="/passengers" element={<Passengers />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rides/:id" element={<RideDetailsPage />} />
                <Route path="/drivers" element={<DriverPanel />} />
              </Routes>
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
