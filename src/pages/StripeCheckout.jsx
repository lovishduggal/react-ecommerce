import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import '../Stripe.css';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/order/orderSlice';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
    'pk_test_51ORQNzSGXWph5zOVB5HNF5TO94F7vn0dQq5cWWGQ5xEmfZhRz4NdRe3N29lDApkBYGieo6Br6VB2SooLeTfN09Wl00d4lcuz5e'
);

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState('');
    const currentOrder = useSelector(selectCurrentOrder);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('http://localhost:8080/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
            meta: { order_id: currentOrder.id }, //* This info will go to stripe and then to our webhook. So, we can conclude that payment was successful, even if client closes window after pay
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, [currentOrder.totalAmount, currentOrder.id]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
