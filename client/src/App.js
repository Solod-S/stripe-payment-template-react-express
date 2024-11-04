import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OneTimePurchasePage from "./pages/OneTimePurchasePage/OneTimePurchasePage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route end path="/" element={<SharedLayout />}>
          <Route index element={<OneTimePurchasePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
