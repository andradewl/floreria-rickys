import express from 'express';
import bodyParser from 'body-parser';
import paypal from 'paypal-rest-sdk';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'Ac5z9jFzq7vM1OfhlHDJca7sGVhMmyfXSQeSwJE0nxoXboxS_6hSVVy1ownxLWjmXD89Ad66Ql3ivC2V',
  'client_secret': 'EGHjMALjTmGXlrxEhsz5HxYcYYnRWl_Ov4DoOZuMFJg8M4KXlQ2YZI_7QwGufdQjvhkVhQccTow8CsND'
});

app.post('/pagar', (req, res) => {
    const create_payment_json = {
        intent: 'sale',
        payer: {
        payment_method: 'paypal'
        },
        redirect_urls: {
        return_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
        },
        transactions: [{
        item_list: {
            items: [{
            name: 'Producto Ejemplo',
            sku: '001',
            price: '25.00',
            currency: 'USD',
            quantity: 1
            }]
        },
        amount: {
            currency: 'USD',
            total: '25.00'
        },
        description: 'Descripción del producto'
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
        throw error;
        } else {
        for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
            }
        }
        }
    });
});

app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        payer_id: payerId,
        transactions: [{
        amount: {
            currency: 'USD',
            total: '25.00'
        }
    }]
};

paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.error(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Pago completado');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});