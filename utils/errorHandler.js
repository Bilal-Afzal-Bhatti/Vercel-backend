// utils/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log full stack trace for debugging

  // Custom handling for Stripe key or other env errors
  if (err.message.includes("STRIPE_KEY")) {
    return res.status(500).json({
      success: false,
      message:
        "Stripe API key is not set! Please configure STRIPE_KEY in environment variables.",
    });
  }

  // Handle other known errors (optional)
  if (err.type === "StripeInvalidRequestError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Default fallback for all other errors
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};

export default errorHandler;