#### Cheers, Finally completed README file for the repo :) ;) !!

---

## About the Project

### Idea
We have finalized the idea after submitting our first proposal now. We decided on a Decentralized freelancing Web application. The project is decentralized using the ethereum blockchain. To give a brief overview, a freelancing project consists of two major aspects: The price and the deadline. Any web application should consist of these two features whether decentralized or not. It is important to make sure that a freelancer gets his fees if he delivers his project and on the other hand, the employer should have some guarantee to make sure the project will be delivered on time before the deadline.

### Features of this DApp:

- An employer can create a smart contract having the following arguments: deadline, the freelancer’s address, and the price of the project he is willing to pay. He would need to deposit some ether into the contract to initialize it to make sure of payment.

- The freelancer should also be able to check the properties of the smart contract to check if the fees to be paid and the deadline of the project are matching. The project can also be divided into small parts such that after completion of each small part, the freelancer can ask for some ether to be deposited to him.

- All of these details should be shown on the web app to the employer. He can then unlock the freelancer’s reward from his end to send the ether for partial completion. The Freelancer can also easily now withdraw this ether.

- If the freelancer is not able to complete the project on the given deadline, then:
    - The deadline can be increased by the employer.

    - The deadline can be canceled by the employer. All the remaining ether in the smart contract would be deposited back to the employer.

---

## Built With

- React.js
- Ganache
- Truffle
- Solidity
- web3

## Concepts

- Solidity, Ganache, Truffle for writing and deploying smart contracts
- Testing using Javascript promises using async/await
- Front end using React
- Used react router, states, props, controlled forms, PureComponents for faster rendering.
- Used DidComponentMount() to fetch data form blockchain and update variable states

---

## Development Process:

### Back-end
- Create a new project directory -- Delance
- Run `truffle unbox react` to create a truffle project with smart contract.
- Delete test files, simplestorage.sol,

- Edit `truffle-config.js` with this.
-

    const path = require("path");

    module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.joi(__dirname, "client/src/contracts"),
    networks: {
        develop: {
        network_id: "*",
        port: 8545,
        host: "127.0.0.1"
        }
    },
    mocha: {},
    compilers: {
        solc: {
        version: "^0.8.7",
        }
    }
    };

- update pragrma statement with `pragma solidity >=0.4.21 <0.9.0`;
- try to compile smart contract using `truffle compile`.

- create delance smart contract using `truffle create contract Delance`.
- copy the code from in `Delance.sol` from given file
- run `truffle test`
- create new test using `truffle create test Delance`
- update `2_deploy_contracts.js` code
- run `truffle test`
- Run ganache -- add its port and host in truffle-config.js
- Update freelancer address, deadline, and initialBalance in `2_deploy_contracts.js` as required.
- run `truffle migrate`
  - By default, smart contract will be deployed with `account[0]` and parameters you specified in the deployment file.
  - Check your blockchain. After successful deployation you should see some transactions on the blockchain.

*Cheers, you are done with the backend part.*

### Front-End

- Go to `/client/src` directory and open `App.js` file.
- Replace simplestorage with Delance and comment out everything *in* runExamples
- Go back to `/client` directory and run `npm start` -- make sure to connect metamask before.

- Go to `/client` directory and paste Components folder, Pages folder there. Also copy paste code from App.js
- run `npm start` to run development server

***Note:***

*Cheers, you are now done with the frontend part also. Tweek as much as you like :)*

---

### Cloning project

- Go to the your required directory and run `git clone repo`.
- Change network/blockchain configuration in `truffle-config.js` file in project directory.
- Change freelancer address in `2_deploy_migrations.js` file in `/migrations` directory.
- go to `/client` directory and run `npm start` to start development server.

---

### TODO
- Check project directories for some TODOs and FIXME. Use vscode todo tree directory for quickly doing this.
