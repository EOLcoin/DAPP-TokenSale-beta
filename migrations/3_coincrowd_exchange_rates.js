var CoinCrowdExchangeRates = artifacts.require("./CoinCrowdExchangeRates.sol");

module.exports = function(deployer) {
  deployer.deploy(CoinCrowdExchangeRates);
};
