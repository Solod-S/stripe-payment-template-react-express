import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./SubscriptionForm.css";
import logo from "../../img/logo.png";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const SubscriptionForm = () => {
  const [sites, setSites] = useState(1);
  const [prices, setPrices] = useState([]);
  const [period, setPeriod] = useState("month");
  const [price, setPrice] = useState(10);
  const [email, setEmail] = useState("");

  const calculatePrice = (sites, period) => {
    if (period === "month") {
      return sites * 10; // Цена за месяц
    } else if (period === "year") {
      return sites * 120; // Цена за год
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const url = `http://localhost:5555/api/payment/get-all-prices`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          //  body: JSON.stringify({ email }),
        });
        const { prices } = await response.json();
        console.log("Received prices:", prices);

        setPrices(prices);
      } catch (error) {
        console.error("Error while getting prices:", error);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    setPrice(calculatePrice(sites, period));
  }, [sites, period]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Логика для подписки
    const response = await fetch(
      "http://localhost:5555/api/payment/process-subscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, price, sites, period }),
      }
    );

    const data = await response.json();
    if (data.success) {
      alert("Subscription created successfully!");
    } else {
      console.error("Subscription creation failed.");
    }
  };

  return (
    <div className="container">
      <div className="payment-form-container">
        <h2>Subscription form</h2>
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
            Price: <strong style={{ color: "red" }}>${price}</strong>
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
