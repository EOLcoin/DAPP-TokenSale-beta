var TokenSale = artifacts.require("./TokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(TokenSale, "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4", "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f", "1521936000", "1524614400");
};