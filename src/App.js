import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {sendIOTA,ActivateOnReceieveTransaction,generateAddress} from './IOTA-API/main.js'
import {setInterval, setTimeout} from "jsdom";

var QRCode = require('qrcode-react');

class App extends React.Component {
    state = {
        address: "Finding Address...",
    }
    constructor(props) {
        super(props);
    }


    fetchAddr() {
        generateAddress("VVCNTEJLAXHSPHFICHRBFYYFN9WXJBVQSQWSAVQOFNVIPUYZHWSLFAKBGWBTYSJTEHWEUJBQXBEDSIQOC")
            .then(value => {
              console.log(value)
                this.setState({address : value});
                this.forceUpdate();
            })
            .catch((e) => console.log(e));

    }
    componentDidMount() {
        this.fetchAddr();
    }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title">
          <h1>Jukebox</h1>
              {this.state.address}
              <p>
                  <QRCode
                      value={JSON.stringify({
                          address: this.state.address,
                          message: ''})}
                      size={500}
                      color="black"
                      backgroundColor="transparent"
                  />
              </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
