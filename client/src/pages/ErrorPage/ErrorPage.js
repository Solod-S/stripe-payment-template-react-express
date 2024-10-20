import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Payment Failed!</h1>
      <p>Something went wrong during the payment process.</p>
      <Link to="/">Try again</Link>
    </div>
  );
};

export default ErrorPage;
