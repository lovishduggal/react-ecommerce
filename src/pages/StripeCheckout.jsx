import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import '../Stripe.css';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (currentOrder && currentOrder.id) {
            fetch('/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentOrder),
            })
                .then((res) => res.json())
                .then((data) => {
                    setClientSecret(data.clientSecret);
                });
        } else {
            return navigate(-1);
        }
    }, [currentOrder, navigate]);

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
                    <div className="text-center my-4">
                        <h1 className="text-2xl">
                            When testing interactively, use a card number, such
                            as <strong>4000003560000008</strong>.<br /> Enter
                            the card number in the Dashboard or in any payment
                            form.
                        </h1>
                        <ul>
                            <li>Use a valid future date, such as 12/34.</li>
                            <li>Use any three-digit CVC, such as 111.</li>
                            <li>
                                Use any value you like for other form fields.
                            </li>
                        </ul>
                    </div>
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <CheckoutForm className="w-[300px]"/>
                    </div>
                </Elements>
            )}
        </div>
    );
}
