import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import CoinCrowdExchangeRates from '../build/contracts/CoinCrowdExchangeRates.json';
import Token from '../build/contracts/Token.json';
import TokenSale from '../build/contracts/TokenSale.json';
import RC from '../build/contracts/RC.json';

import PrettyProgressbar from 'pretty-progressbar';
import { BigNumber } from 'bignumber.js';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const contract = require('truffle-contract');

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      coincrowdExchangeRates: null,
      token: null,
      tokenSale: null,
      address: '',
      tokenProgress: 0,
      addressRC: ''
    }

    this.getAddress = this.getAddress.bind(this);
    this.getPercentual = this.getPercentual.bind(this);
    this.newRC = this.newRC.bind(this);
    this.buyRC = this.buyRC.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        // Instantiate contract once web3 provided.
        this.instantiateContracts();
      })
      .catch(() => {
        console.log('Sorry');
      })
  }

  instantiateContracts() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    //const contract = require('truffle-contract')

    const coincrowdExchangeRates = contract(CoinCrowdExchangeRates);
    const token = contract(Token);
    const tokenSale = contract(TokenSale);

    coincrowdExchangeRates.setProvider(this.state.web3.currentProvider)
    token.setProvider(this.state.web3.currentProvider)
    tokenSale.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      coincrowdExchangeRates.deployed().then((coincrowdExchangeRates) => {
        this.setState({
          coincrowdExchangeRates
        });
        return coincrowdExchangeRates;
      });
      token.deployed().then((token) => {
        console.log('Token', token);
        this.setState({
          token
        }, this.getPercentual);
        return token;
      });
      tokenSale.deployed().then((tokenSale) => {
        console.log('TokenSale', tokenSale);
        this.setState({
          tokenSale
        }, this.getAddress);
        return tokenSale;
      });
    });
  }

  async getAddress() {
    const { tokenSale } = this.state;
    let address = await tokenSale.tokenContract();
    this.setState({
      address
    }, this.newRC);
  }

  async getPercentual() {
    const { token, address } = this.state;
    let soldTokens = await token.balanceOf(address);
    soldTokens = new BigNumber(soldTokens);
    let totalSupply = await token.initialSupply();
    totalSupply = new BigNumber(totalSupply);
    let tokenProgress = soldTokens.dividedBy(totalSupply);
    tokenProgress = tokenProgress.toNumber();
    this.setState({
      tokenProgress
    });
  }

  async newRC() {
    const { token, tokenSale, address } = this.state;
    let soldTokens = await token.balanceOf(address);
    soldTokens = new BigNumber(soldTokens);
    console.log(soldTokens);
    let totalSupply = await token.initialSupply();
    totalSupply = new BigNumber(totalSupply);
    console.log(totalSupply);
    let remainingTokens = totalSupply.minus(soldTokens);
    remainingTokens = remainingTokens.toString();
    console.log(remainingTokens);
    let addressRC = await tokenSale.newRC("300000000000000000", remainingTokens, { from: '0x627306090abab3a6e1400e9345bc60c78a8bef57' });
    addressRC = addressRC.logs[0].address;
    console.log(addressRC);
    this.setState({
      addressRC
    }, this.buyRC)
  }

  async buyRC() {
    const { addressRC, web3 } = this.state;
    const rc = web3.eth.contract(RC.abi).at(addressRC);
    console.log(rc);
    //const abi = rc.methods.transfer(addressRC, 1).encodeABI()
    //console.log(abi);
    //rc.setProvider(this.state.web3.currentProvider);
    /*rc.eth.sendTransaction({ from: '0xf17f52151ebef6c7334fad080c5704d77216b732', value: web3.toWei(1, 'ether') }).then((result) => {
      console.log(result);
    });*/
    //rc.methods.transfer('0xf17f52151ebef6c7334fad080c5704d77216b732', 1).send().then(console.log).catch(console.error);
  }

  render() {
    const { address, tokenProgress } = this.state;
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {address}</p>
              <PrettyProgressbar
                percentage={tokenProgress}
                type='circle'
                label={true}
                progressStyle={{ backgroundColor: '#00ADE6' }} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
