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
import PaymentListPage from "./modules/payments/Payments";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentDetails from "./modules/payments/paymentsDetails";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
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
                  <Route path="/users/:id" element={<DriverDetailsPage />} />
                  <Route path="/payments/:id" element={<PaymentDetails />} />
                  <Route path="/payments" element={<PaymentListPage />} />
                  
                </Routes>
              </Layout>
          }
        />
        </Route>
        <Route path="*" element={<Navigate to ="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
