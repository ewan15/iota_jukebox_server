import {iota, Converter, client} from './IOTAPackages.js';
var async = require("async");


let addressType = {address: String, hasRead: Boolean}

let addressList = [];



export let sendIOTA = function (seed,addr,amount,msg) {
    const transfers = [{
        address: addr,
        value: amount, // 1Ki
        tag: '', // optional tag of `0-27` trytes
        message: Converter.asciiToTrytes(msg) // optional message in trytes
    }]
    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            // Persist trytes locally before sending to network.
            // This allows for reattachments and prevents key reuse if trytes can't
            // be recovered by querying the network after broadcasting.

            // Does tip selection, attaches to tangle by doing PoW and broadcasts.
            return iota.sendTrytes(trytes, 3, 14)
        })
        .then(bundle => {
            console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
            console.log(`Bundle: ${bundle}`)
        })
        .catch(err => {
            console.log(err)
        })
}

export function generateAddress(seed) {

    return new Promise((resolve, reject) => {
        iota.getNewAddress(seed,{}, function(e, s) {
            if (e) {
                resolve(e)
            } else {
                sendIOTA(seed,s,0,"GenerateAddr");
                resolve(s)

            }
        })
    })
}



let onRecieveTransaction = function(func)
{
    iota.findTransactions({ addresses: addressList.address })
        .then(hashes => {
            if (!addressList.find(hashes).hasRead) {
                addressList.find(hashes).hasRead = true;
                func(hashes)
            }
        })
        .catch(err => {
            // handle errors here
        })
}

export let ActivateOnReceieveTransaction = function(func)
{
    setInterval(function() {
        onRecieveTransaction(func)
    }, 5000);
}

let getBalance = function(seed)
{
    iota.getAccountData(seed, {
        start: 0,
        security: 2
    })
        .then(accountData => {
            const { addresses, inputs, transactions, balance } = accountData
            console.log(balance)
            // ...
        })
        .catch(err => {
            // ...
        })
}


/*
generateAddress("VVCNTEJLAXHSPHFICHRBFYYFN9WXJBVQSQWSAVQOFNVIPUYZHWSLFAKBGWBTYSJTEHWEUJBQXBEDSIQOC")
    .then(value => {
        console.log(value)
    })
    .catch(err =>{
        console.log(err)
    })
*/
