import React, { PureComponent } from "react";
import "./styles/details.css";
import {Card, Container, Badge, Button} from "react-bootstrap"

class Details extends PureComponent {
    /* we are receiving web3 and contract as props and storing all data as local states for UI. */
    constructor(props) {
        super(props);
        this.state = {
            contractAddress: null,
            freelancer: null,
            employer: null,
            deadline: null,
            status: "pending",
            price: null,
            contract_balance: null,
            requests: [],
        };
    }

    // This function is used to transfer the amount for a particular request to the freelancer
    async handleWithdraw(index) {
        // console.log('clicked withdraw button', index);

        const current_address = await this.props.web3.currentProvider.selectedAddress;
        const index_local = parseInt(index);
        // console.log(current_address);

        try {
            // console.log('calling withdraw function');
            await this.props.contract.methods.withdraw(index_local).send({from: current_address});
            alert('successfully withdraw payment for the request');

            const updatedRequests = await this.props.contract.methods.getAllRequest().call();
            // console.log('successfully fetched updated requests');

            this.setState({requests: updatedRequests});
            // console.log('successfully updated state');
        }
        catch(error){
            alert('error occured. check log for more details.');
            console.log(error);
        }
    }

    // This function is used to unlock a particular request raised by freelancer
    async handleUnlockRequest(index) {
        // console.log('clicked unlocked button', index);
        // console.log(this.props.contract);

        const current_address = await this.props.web3.currentProvider.selectedAddress;
        const index_local = parseInt(index);
        // console.log(current_address);

        try {
            // console.log('calling unlock request function');
            await this.props.contract.methods.unlockRequest(index_local).send({from: current_address});
            alert('successfully unlocked request');

            const updatedRequests = await this.props.contract.methods.getAllRequest().call();
            // console.log('successfully fetched updated array');
            this.setState({requests: updatedRequests});
        }
        catch(error){
            alert('error occured while processing. check log for more details');
            console.log(error);
        }
    }

    // This is a helper function to print a table row for a particualr request
    printRequest(request, index){
        return (
            <tr key={index} className="table-row">
                <td> {index} </td>
                <td> {request[0]} </td>
                <td> {request[1]} </td>
                <td> {request[2] ? "True" : "False"} </td>
                <td> {request[3] ? "True" : "False"} </td>
                <td><Button variant="secondary" disabled={request[2]===false} onClick={ () => this.handleUnlockRequest(index) }> Unlock </Button></td>
                <td><Button variant="secondary" disabled={request[3]===true} onClick={ () => this.handleWithdraw(index) }> Withdraw </Button></td>
            </tr>
        );
    }

    // This function prints all requests in table format
    printRequests(){
        return (
            <table className="center">
                {/* <caption> Requests </caption> */}
                <thead><tr>
                    <th> # </th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Locked</th>
                    <th>Paid</th>
                    <th>Unlock</th>
                    <th>Withdraw</th>
                </tr></thead>

                <tbody>
                    {this.state.requests.map( (request, index) => this.printRequest(request, index))}
                </tbody>
            </table>
        );
    }

    // This helper function prints card in a specific format
    printCard(cardName, property){
        return (
            <Card bg="secondary" text="white" border="warning">
                <Card.Header> {cardName} </Card.Header>
                <Card.Body><Card.Text>
                    {property}
                </Card.Text></Card.Body>
            </Card>
        );
    }

    render() {
        return (
            <div>
                {/* HEADER */}
                <Container fluid className="gradient1">
                    <h1> <Badge bg="none" text="success">  Project Details </Badge> </h1>
                    <h4> <Badge bg="none" text="success"> Contract address: {this.state.contractAddress}  </Badge> </h4>
                    <h4> <Badge bg="none" text="success"> The remaining payment is: {this.state.contract_balance} </Badge></h4>
                    <h4> <Badge bg="none" text="success">  Status: { this.state.contract_balance === "0" ? "Complete" : "Pending"} </Badge> </h4>
                </Container>

                {/* CARDS */}
                <Container fluid className="card-holder">
                    {this.printCard('Employer', this.state.employer)}
                    {this.printCard('Freelancer', this.state.freelancer)}
                    {this.printCard('Price', this.state.price)}
                    {this.printCard('Deadline', this.state.deadline)}
                </Container>

                {/* REQUEST HEADING */}
                <Container className="center mt-1 pt-3">
                    <h1> Requests </h1>
                </Container>

                {/* REQUEST TABLE */}
                <Container fluid>
                    {this.printRequests()}
                </Container>
            </div>
        );
    }

    // This is react function. It used to fetch and update the state values dynamically (as they change in the background)
    async componentDidMount(){
        // console.log(this.props.contract);

        const contract_address_local = this.props.contract._address;
        // console.log(contract_address_local);

        const employer = await this.props.contract.methods.employer().call();
        // console.log(employer);

        const freelancer = await this.props.contract.methods.freelancer().call();
        // console.log(freelancer);

        const deadline = await this.props.contract.methods.deadline().call();
        // console.log(deadline);

        const requests = await this.props.contract.methods.getAllRequest().call();
        // console.log(requests);

        const price = await this.props.contract.methods.price().call();
        const contract_balance = await this.props.contract.methods.contract_balance().call();
        // console.log(price);
        // console.log(contract_balance);

        this.setState({contractAddress: contract_address_local, freelancer: freelancer, employer: employer, deadline: deadline, requests: requests, price: price, contract_balance: contract_balance});
    }
}

export default Details;