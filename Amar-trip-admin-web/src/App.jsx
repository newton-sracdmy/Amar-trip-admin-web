import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rides from "./modules/rides/components/Rides";
import Layout from "./components/Layout";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/rides" element={<Rides />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
