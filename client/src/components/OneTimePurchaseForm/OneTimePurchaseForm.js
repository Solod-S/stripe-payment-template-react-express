import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentForm.css";
import logo from "../../img/logo.png";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const OneTimePurchaseForm = () => {
  const [sites, setSites] = useState(1);
  const [period, setPeriod] = useState("month");
  const [price, setPrice] = useState(10);

  const calculatePrice = (sites, period) => {
    if (period === "month") {
      return sites * 10; // Цена за месяц
    } else if (period === "year") {
      return sites * 120; // Цена за год
    }
  };

  useEffect(() => {
    setPrice(calculatePrice(sites, period));
  }, [sites, period]);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5555/api/payment/process-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, sites, period }),
      }
    );

    const session = await response.json();

    if (session.success) {
      const stripe = await loadStripe(stripePublicKey);
      await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error("Payment session creation failed.");
    }
  };

  return (
    <div className="container">
      <div className="payment-form-container">
        <h2>One-time purchase form</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>
            <p>Period:</p>
            <select value={period} onChange={e => setPeriod(e.target.value)}>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </label>
          <label>
            <p>Number of Sites:</p>
            <input
              type="number"
              min="1"
              value={sites}
              onChange={e => setSites(Number(e.target.value))}
              required
            />
          </label>

          <label style={{ color: "red" }}>
            Price: <strong style={{ color: "red" }}>${price}</strong>
          </label>
          <button type="submit" className="submit-button">
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default OneTimePurchaseForm;
