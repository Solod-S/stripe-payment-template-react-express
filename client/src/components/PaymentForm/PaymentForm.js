import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentForm.css";
import logo from "../../img/logo.png";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const PaymentForm = () => {
  const [sites, setSites] = useState(1);
  const [period, setPeriod] = useState("month");
  const [price, setPrice] = useState(10);
  const [email, setEmail] = useState(""); // Состояние для электронной почты
  const [isSubscription, setIsSubscription] = useState(false); // Флаг для подписки

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

    if (isSubscription) {
      // Логика для подписки
      const response = await fetch(
        "http://localhost:5555/api/payment/subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, price, sites, period }), // Передаем цену
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Subscription created successfully!");
      } else {
        console.error("Subscription creation failed.");
      }
    } else {
      // Логика для разовой оплаты
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
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" style={{ width: "100px" }} />
      <div className="payment-form-container">
        <h2>{isSubscription ? "Subscription Form" : "Payment Form"}</h2>
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

          {isSubscription && (
            <label>
              <p>Email:</p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
          )}

          <label style={{ color: "red" }}>
            Price: <strong style={{ color: "red" }}>${price}</strong>
          </label>
          <button type="submit" className="submit-button">
            {isSubscription ? "Create Subscription" : "Make Payment"}
          </button>
        </form>
        {/* <label>
          <input
            type="checkbox"
            checked={isSubscription}
            onChange={e => setIsSubscription(e.target.checked)}
          />
          Subscribe
        </label> */}
      </div>
    </div>
  );
};

export default PaymentForm;
