
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYsJCaZfgj6KHfKlmYrkk5zRi5UdaDd94Ew6PtwfLA2c1JsocatAvZKtcHvUU-VMd1KHVjahJvsOLbnA', // please provide your client id here
    'client_secret': 'EG2EEx66Y9t1oWQPHfR32TQUcxa_Rm5n5uyZcE9S_yMqgDvqEabskqxj1cN9Eoc2GKPCShHfjIPqZjke' // provide your client secret here
});

const createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
        if ( err ) {
            reject(err);
        }
        else {
            resolve(payment);
        }
        });
    });
}

const handlePayment = () => {
    const payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal",
        },
        "redirect_urls": {
            "return_url": "http://127.0.0.1:5000/payment/success",
            "cancel_url": "http://127.0.0.1:5000/payment/failed"
        },
        "transactions": [{
            "amount": {
                "total": amount, // TODO: Make it dynamic
                "currency": "USD",
            },
            "description": " a book on mean stack "
        }],
        "application_context": { shipping_preference: 'NO_SHIPPING' }
    }

    createPay( payment )
    .then( ( transaction ) => {
        var id = transaction.id;
        //console.log('Transaction ID: ', id);
        var links = transaction.links;
        //console.log('Transaction Links: ', links);
        var counter = links.length;
        //console.log('Links Length: ', counter);
        while( counter -- ) {
            if ( links[counter].method == 'REDIRECT') {
                // redirect to paypal where user approves the transaction
                return props.history.push( links[counter].href )
            }
        }
    })
    .catch( ( err ) => {
        console.log( err );
    });
};