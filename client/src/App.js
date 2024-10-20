import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentPage />} />

        <Route path="/success" element={<SuccessPage />} />

        <Route path="/error" element={<ErrorPage />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
