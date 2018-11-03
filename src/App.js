import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {sendIOTA,ActivateOnReceieveTransaction,generateAddress} from './IOTA-API/main.js'


class App extends React.Component {
    state = {
        address: "Findingz Address...",
    }
    constructor(props) {
        super(props);
    }


    fetchAddr() {
        generateAddress("VVCNTEJLAXHSPHFICHRBFYYFN9WXJBVQSQWSAVQOFNVIPUYZHWSLFAKBGWBTYSJTEHWEUJBQXBEDSIQOC")
            .then(value => {
              console.log(value)
                this.setState({address : value});
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
          </div>
        </header>
      </div>
    );
  }
}

export default App;
