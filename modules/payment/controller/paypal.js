var path = require('path');
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYsJCaZfgj6KHfKlmYrkk5zRi5UdaDd94Ew6PtwfLA2c1JsocatAvZKtcHvUU-VMd1KHVjahJvsOLbnA', // please provide your client id here
    'client_secret': 'EG2EEx66Y9t1oWQPHfR32TQUcxa_Rm5n5uyZcE9S_yMqgDvqEabskqxj1cN9Eoc2GKPCShHfjIPqZjke' // provide your client secret here
});

var createPay = ( payment ) => {
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


exports.paymentHome = (req, res) => {
    res.redirect('/index.html');
};

exports.paymentProcessor = ( req , res ) => {
	// create payment object
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://127.0.0.1:5000/payment/success",
            "cancel_url": "http://127.0.0.1:5000/payment/failed"
        },
        "transactions": [{
            "amount": {
                "total": 100.00,
                "currency": "USD"
            },
            "description": " a book on mean stack "
        }]
    }

	// call the create Pay method
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
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch( ( err ) => {
            console.log( err );
            res.redirect('/err');
        });
};

// success page
exports.success = (req ,res ) => {
    console.log(req.query);
    // console.log(req.body);
    res.json({
        message: "Payment successfully processed"
    });
};

// error page
exports.failed = (req , res) => {
    console.log(req.query);
    res.json({
        message: "Payment failed"
    });
};