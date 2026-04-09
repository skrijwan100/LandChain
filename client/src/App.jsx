import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import AadhaarVerify from "./pages/AadhaarVerify.jsx";
import LandVerify from "./pages/LandVerify.jsx";
import SubmitBlockchain from "./pages/SubmitBlockchain.jsx";
import CheckLand from "./pages/CheckLand.jsx";
import AadhaarValidation from "./pages/AadhaarValidation.jsx";

const App = () => {
  return (
    <>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Action Pages */}
         <Route path="/verify-aadhaar" element={<AadhaarValidation />} />
        {/*<Route path="/verify-land" element={<LandVerify />} />*/}
        <Route path="/submit-blockchain" element={<SubmitBlockchain />} />
        {/* <Route path="/check-land" element={<CheckLand />} /> */}
      </Routes>
    </>
  );
};

export default App;
