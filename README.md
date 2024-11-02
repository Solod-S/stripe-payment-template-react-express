![Demo](/public/banner.jpg)

# 🏦 Payment Payment Template

This is a simple React application that integrates Stripe payment processing. Users can select the number of sites and a billing period (monthly or yearly), and the price is automatically calculated. The app supports routing for the payment form, success page, error page, and handles automatic redirects.

## 📦 Features

- **Stripe Payment Integration:** Users can securely process payments using Stripe.
- **Dynamic Price Calculation:** Price is calculated automatically based on the number of sites and the billing period.
- **React Router:** Smooth navigation between the payment form, success, and error pages.
- **Responsive Design:** The payment form is styled to look great on desktop and mobile devices.
- **Error Handling:** In case of a failed payment, users are redirected to an error page with the option to retry.
- **API with Endpoints:** The application exposes a set of API endpoints for payment processing, including:

```bash
- POST /api/payment/process-payment: Create a payment session.
- POST /api/payment/webhook: Handle payment callbacks from Stripe.
- GET /api/payment/payments: Retrieve all payment intents.
- GET /api/payment/charges: Retrieve all completed charges.
- POST /api/payment/refund: Process refunds for payments.
- POST /api/customers: Create new customers in Stripe.
- POST /api/payment/subscription: Create subscriptions for customers.
- GET /api/payment/status/:paymentIntentId: Get the status of a specific payment intent.
```

## 🛠 Tech Stack

- **React:** Frontend library for building user interfaces.
- **Stripe.js:** Used to integrate payment processing with Stripe.
- **React Router:** For client-side routing.
- **CSS:** Custom styles for a clean and modern user experience.
- **NodeJS:** JavaScript runtime for building scalable server-side applications.
- **ExpressJS:** Minimal web framework for Node.js, used to create API endpoints and handle payment processing with Stripe.
- **Swagger**: API documentation tool for defining and visualizing API endpoints.

## 🚀 Getting Started

### Prerequisites

To run this project locally, you need the following:

- Node.js (v14+ recommended)
- Stripe account: Set up your Stripe account to get a public key for the integration.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Solod-S/stripe-payment-template-react-express.git
   cd payment-form-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your .env file:

   Create a .env file in the root of your project and add your Stripe public key:

   ```bash
   REACT_APP_STRIPE_PUBLIC_KEY
   STRIPE_SECRET
   STRIPE_WEBHOOK_SECRET
   ```

4. Start the development server:

   ```bash
   npx nodemon index.js
   ```

The server will run on [http://localhost:5555](http://localhost:5555).

5. Start the client:

   ```bash
   npm start
   ```

   The app will run on [http://localhost:3000](http://localhost:3000).

## Project Structure

```bash
.
├── public                  # Public files
├── src                     # Source code
│   ├── pages
│   │   ├── PaymentPage      # Payment page
│   │   ├── SuccessPage      # Payment success page
│   │   └── ErrorPage        # Payment error page
│   ├── App.js               # Main app entry point with routing
│   ├── index.js             # ReactDOM render method
│   └── App.css              # Custom styles
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── README.md                # You are here!
```

## 🧑‍💻 Usage

Once you've started the app, you'll be able to access the following routes:

- `/`: Main payment form where users can input site numbers and select the billing period.
- `/success`: Redirects here after a successful payment.
- `/error`: Redirects here if there’s an issue with the payment.
- `/404`: If a non-existent route is accessed, redirects back to the payment form.

### Payment Form

- Select the number of sites and choose between monthly or yearly billing.
- The price will adjust based on your selections:
  - 1 site = $10/month or $120/year.

### Error and Success Pages

- If the payment succeeds, you'll be redirected to the success page.
- In case of failure, you'll be redirected to the error page.

## 🎨 Customization

You can customize the form and styling by editing the `App.css` and `PaymentForm.css` file. For example, to adjust the form layout or buttons, feel free to tweak the existing CSS or add your own classes.

## 🔧 Deployment

To deploy this app:

1. Build the app for production:

   ```bash
   npm run build
   ```

2. Deploy the build folder to any static hosting service like Netlify or Vercel.

## ⚙️ API Reference

![Demo](/public/banner_2.jpg)

This app relies on an external payment processing API at:

- `/api/payment/process-payment`: This endpoint is used to initiate the payment session for Stripe.
- `/api/payment/process-payment/webhook`: This endpoint is used to handle callback payment data.
- `/api/payment/process-payment/payments:` This endpoint retrieves a list of all payment intents made via Stripe.
- `/api/payment/process-payment/charges:` This endpoint retrieves a list of all completed charges processed by Stripe.
- `/api/payment/refund:` This endpoint is used to process refunds for payments.
- `/api/customers:` This endpoint allows the creation of new customers in Stripe for future payment processing.
- `/api/payment/subscription:` This endpoint is used to create subscriptions for customers.
- `/api/payment/status/:paymentIntentId:` This endpoint retrieves the status of a specific payment intent using its ID.

## 🤝 Contributing

Contributions are welcome! Feel free to open a pull request or submit an issue to suggest improvements or report bugs.

## 🛡 License

This project is licensed under the MIT License. See the LICENSE file for more information.

🎉 Happy Coding! ✨ If you have any questions, feel free to reach out.
