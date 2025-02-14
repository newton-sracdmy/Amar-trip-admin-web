import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rides from "./modules/rides/components/Rides";
import Layout from "./components/Layout";
import DriverPanel from "./modules/drivers/drivers";
import Passengers from "./modules/passengers/passengers";
import Dashboard from "./modules/dashboard/DashBoard";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element= {<Dashboard />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/drivers" element={<DriverPanel />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/dashboard" element= {<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
