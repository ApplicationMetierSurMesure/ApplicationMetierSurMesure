const express = require('express');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

// Example contracts data
const contracts = [
  { id: 1, name: 'Contrat de base', status: 'actif' },
  { id: 2, name: 'Contrat premium', status: 'expire' }
];

app.get('/contracts', (req, res) => {
  // In real implementation, fetch user contracts from database
  res.json(contracts);
});

app.post('/purchase-maintenance', async (req, res) => {
  try {
    // Create a Stripe Checkout session for a maintenance contract
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Contrat de maintenance' },
            unit_amount: 5000 // 50 EUR
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel'
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur creation session Stripe');
  }
});

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle invoice.paid event, etc
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object;
    console.log('Invoice paid:', invoice.id);
  }
  res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur BNB Client Portal lancé sur le port ${PORT}`);
});
