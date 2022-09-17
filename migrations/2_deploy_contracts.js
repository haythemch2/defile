const DeFile = artifacts.require("./DeFile.sol");

module.exports = function (deployer) {
  deployer.deploy(DeFile);
};
