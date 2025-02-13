import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rides from "./modules/rides/components/Rides";
import Layout from "./components/Layout";
import DriverPanel from "./modules/drivers/drivers";
import Passengers from "./modules/passengers/passengers";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/rides" element={<Rides />} />
          <Route path="/drivers" element={<DriverPanel />} />
          <Route path="/passengers" element={<Passengers />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
