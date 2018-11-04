import React  from 'react';
import './App.css';
import {generateAddress, getLastTransaction, getHash} from './IOTA-API/main.js'



var QRCode = require('qrcode-react');

var seed = "VVCNTEJLAXHSPHFICHRBFYYFN9WXJBVQSQWSAVQOFNVIPUYZHWSLFAKBGWBTYSJTEHWEUJBQXBEDSIQOC"

var lastAddr = "NA"

class App extends React.Component {
    state = {
        addressV: "Finding Address...",
    }
    constructor(props) {
        super(props);
    }


    fetchAddress() {
        generateAddress(seed)
            .then(valueSeed => {
                console.log(valueSeed);

                this.setState({addressV : valueSeed});
                this.forceUpdate();

                this.fetchAddress();

            })
            .catch((e) => console.log(e));

    }

    fetchTransactions() {
        getLastTransaction()
            .then(data => {
                console.log("Found Data!")
                console.log(data);

                const { addresses, inputs, transactions, balance } = data

                var transList =  transactions.filter(function(element) {
                    return getHash().indexOf(element) === -1;
                });

                if (!(transList[transList.length-1] === lastAddr)){
                    console.log("New ADDR found!")
                    lastAddr = addresses;
                }
                else{
                    console.log("No new transaction found")
                }

                this.fetchTransactions();

            })
            .catch((e) => console.log(e));

    }
    componentDidMount() {
        this.fetchAddress();
        this.fetchTransactions();
    }
    componentWillUnmount() {

    }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Jukebox</h1>
              <div className="address">{this.state.addressV}</div>
              <p>
                  <QRCode
                      value={JSON.stringify({
                          "address":
                              this.state.addressV,
                          "amount": 1,
                          "tag": 'PIZZAPIZZA',
                          "message": 'ID= ADDR='
                      })}

                      size={600}
                      color="black"
                      backgroundColor="transparent"
                  />
              </p>


        </header>
      </div>
    );
  }
}

export default App;
