import React, { useState, useEffect } from "react";
import "./SubscriptionForm.css";
import logo from "../../img/logo.png";
import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const SubscriptionForm = () => {
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const url = `http://localhost:5555/api/payment/get-all-prices`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const { prices } = await response.json();
        console.log("Received prices:", prices);

        setPrices(prices);

        // Устанавливаем первую цену по умолчанию
        if (prices.length > 0) {
          setSelectedPrice(prices[0]);
        }
      } catch (error) {
        console.error("Error while getting prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!selectedPrice || !email) {
      alert("Please select a price and enter your email.");
      return;
    }

    const response = await fetch(
      "http://localhost:5555/api/payment/process-subscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: selectedPrice.id,
          userEmail: email,
        }),
      }
    );

    const session = await response.json();
    console.log(`session`, session);
    if (session.sessionId) {
      const stripe = await loadStripe(stripePublicKey);
      await stripe.redirectToCheckout({ sessionId: session.sessionId });
    } else {
      console.error("Payment session creation failed.");
    }
  };

  return (
    <div className="container">
      <div className="payment-form-container">
        <h2>Subscription Form</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>
            <p>Select Price:</p>
            <select
              value={selectedPrice?.id || ""}
              onChange={e =>
                setSelectedPrice(
                  prices.find(price => price.id === e.target.value)
                )
              }
              required
            >
              {prices?.map(price => (
                <option key={price.id} value={price.id}>
                  {price.nickname}
                </option>
              ))}
            </select>
          </label>

          <label>
            <p>Email:</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label style={{ color: "red" }}>
            Price:{" "}
            <strong style={{ color: "red" }}>
              $
              {selectedPrice
                ? (selectedPrice.unit_amount / 100).toFixed(2)
                : "0.00"}
            </strong>
          </label>

          <button type="submit" className="submit-button">
            Create Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
