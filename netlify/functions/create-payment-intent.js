const stripe = require("stripe")
  (process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  try {
    const { amount, currency } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
