import {iota, Converter} from './IOTAPackages.js';



let addressList = [{address: "OHQMCGYXDADZGPQPSQOPCLTKTWRQMIW9RSLADTYSXMAWWRPOJC9DJW9PTUFBERAQP9FCPTNRSX9NXXQJ9ILRQEYHFD", hasRead: false}];

let hash = []


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
            hash.push(bundle[0].hash)
            console.log(`Bundle: ${bundle}`)
        })
        .catch(err => {
            console.log(err)
        })
}

export function generateAddress(seed) {

    return new Promise((resolve, reject) => {
        iota.getNewAddress(seed,{checksum: true}, function(e, s) {
            if (e) {
                resolve(e)
            } else {
                sendIOTA(seed,s,0,"GenerateAddr");

                addressList.push({address: s, hasRead: false});
                resolve(s)

            }
        })
    })
}



/*let onRecieveTransaction = function(func)
{
    iota.findTransactions({ address: addressList.address })
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
    /!*setInterval(function() {
        onRecieveTransaction(func)
    }, 5000);*!/
}*/

/*let getBalance = function(seed)
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
}*/

export function getLastTransaction(){
    return new Promise((resolve, reject) => {
        console.log("Checking transactions...")
        iota.getAccountData("VVCNTEJLAXHSPHFICHRBFYYFN9WXJBVQSQWSAVQOFNVIPUYZHWSLFAKBGWBTYSJTEHWEUJBQXBEDSIQOC", {
            start: 0,
            security: 2
        })
            .then(accountData => {
                //const { addresses, inputs, transactions, balance } = accountData
                console.log("SUCCESS")
                resolve(accountData)
            })
            .catch(err => {
                console.log("ERROR")
                resolve(err)
            })
    })
}

export function getHash(){
    return hash;
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
