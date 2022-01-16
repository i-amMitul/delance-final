import React, {PureComponent} from "react";
import DelanceContract from "./contracts/Delance.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navigation} from "./components";
import {Home, Requests, Details, Deadline} from "./pages";

class App extends PureComponent {
  /* initial state of the app, storing web3, accounts, contracts and current addres*/
  state = { web3: null, accounts: null, contract: null, address: null };

  /* componenetDidMount is a react function, it is called after render() and only once
  when the object renders first time. We use this to update the value of state variables
  from server (async) */
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DelanceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        DelanceContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state.
      this.setState({ web3, accounts, contract: instance });
    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    // If web3 is not loaded, show if, otherwise return part.
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    // we are using router to build multi-route app like in flutter. <Navigation />
    // renders a navbar to the screen, then render Routes to actually allow switching between different routes.
    return (
      <div className="App">
        <Router >
          <Navigation web3={this.state.web3} />

          <Routes>
            {/* each route link to a page in the navbar which is changed by router*/}
            <Route path="/" element={<Home contract={this.state.contract} web3={this.state.web3}/>} />
            <Route path="/requests" element={<Requests contract={this.state.contract} web3={this.state.web3} />} />
            <Route path="/details" element={<Details contract={this.state.contract} web3={this.state.web3} />} />
            <Route path="/deadline" element={<Deadline contract={this.state.contract} web3={this.state.web3} />}> </Route>
          </Routes>

        </Router>
      </div>
    );
  }
}

/* memo is used to improve rendering perfomance of the app. check w3schools */
// memo is used to improve performance of functional components, use PureComponent for class component
export default App;