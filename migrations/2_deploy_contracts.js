var Delance = artifacts.require("./Delance.sol");

module.exports = function(deployer) {
  let freelancer = "0xCDffDedFfc918EAb0e23ca2466130768512D2382";
  let deadline = 10000;
  let initialBalance = "" + 10000;

  deployer.deploy(Delance, freelancer, deadline, initialBalance, {value: initialBalance});
};