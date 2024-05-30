/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */

import FormsComponents from '../../components/FormsComponents'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const publicKey ="pk_test_51OtaX0JA4oGedNG8vf2ynPn2xbHfj18XSDyeyqaizUJuUmxwqxLXfYynjXXQKpLIXDnS1FSxXslaOz4xpEwIe7zI00Tc01jcwT"
const stripeTest=loadStripe(publicKey)

function shopProducts() {

    return (
        <>
            <Elements stripe={stripeTest}>
                <FormsComponents/>
            </Elements>
        </>
    );

}

export default shopProducts


