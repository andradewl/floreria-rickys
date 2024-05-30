import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

function Payment() {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://server-stripe-chi.vercel.app/config").then(async (r) => {
            const { publishableKey } = await r.json();
            if (publishableKey) {
                setStripePromise(loadStripe(publishableKey) as Promise<Stripe | null>);
            } else {
                setStripePromise(null);
            }
        });
    }, []);

    useEffect(() => {
        fetch("https://server-stripe-chi.vercel.app/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({
                // payment_method_config_id: payment_method_config_id,
            }),
        }).then(async (result) => {
            const { clientSecret } = await result.json();
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
        <h1>React Stripe and the Payment Element</h1>
        {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
            </Elements>
        )}
        </>
    );
}

export default Payment;