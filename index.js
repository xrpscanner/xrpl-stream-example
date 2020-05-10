'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({server: 'wss://xrpl.ws'});

api.connect()
    .then(() => {
	// Validation stream is optional and needs explicit subscription
	api.request('subscribe', {streams: ['validations']})
    })
    .then((info) => {
	console.log(info);
    })
    .catch((error) => {
	console.log(error);
    });

api.on('ledger', (ledger) => {
    console.log(ledger);
    
    // Uncomment below to fetch full ledger with transactions

    // api.getLedger({
    // 	ledgerVersion: ledger.ledgerVersion,
    // 	includeTransactions: true,
    // 	includeAllData: true
    // }).then((validated_ledger) => {
    // 	console.log(validated_ledger);
    // });
});

api.connection.on('validationReceived', (validation) => {

    // Print validation messages right before the flag ledger
    // when validators submit their votes.
    if (Number(validation.ledger_index) % 256 === 255) {
	console.log(validation);
    }
});

