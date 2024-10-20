import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Payment Successful!</h1>
      <p>Your payment was processed successfully.</p>
      <Link to="/">Go back to Payment Form</Link>
    </div>
  );
};

export default SuccessPage;
