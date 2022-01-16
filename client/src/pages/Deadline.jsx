import React, {PureComponent} from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles/details.css";

class Deadline extends PureComponent {
    // We receive web3 as props and store deadline (form input field) as a local state
    constructor(props){
        super(props);
        this.state = {deadline: null};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // This function is used to update the deadline
    handleSubmit = async (event) => {
        console.log('submit function fired');
        event.preventDefault();

        try{
            // const current_address = await this.props.web3.currentProvider.selectedAddress;
            // await this.props.contract.methods.ChangeDeadline().send({from: current_address});

            // const new_deadline = await this.props.web3.methods.deadline().call();
            // this.setState({deadline: new_deadline});
            // console.log('successfully updated state');
        }
        catch(e){
            alert('error occured. check log for more details.');
            console.log(e);
        }
    }

    // This function is used to transfer all remaining ether to employer after deadline
    handleWithdrawClick = async (event) => {
        event.preventDefault();

        try{
            const current_address = await this.props.web3.currentProvider.selectedAddress;
            await this.props.contract.methods.WithdrawAll().send({from: current_address});

            const new_deadline = await this.props.web3.methods.deadline().call();
            this.setState({deadline: new_deadline});
            console.log('successfully updated state');
        }
        catch(error){
            alert('error occured. check log for more details.');
            console.log(error);
        }
    }

    render() {
        return(
            <>
                {/* HEADER */}
                <Container fluid className="gradient1">
                    <h1> <Badge bg="none" text="success"> Deadline </Badge> </h1>
                    <h4> <Badge bg="none" text="success"> Change Deadline </Badge> </h4>
                </Container>

                {/* CONTROLLED FORM */}
                <Container>
                    <Row>
                        <Col>
                            <form className="form-inline" onSubmit={this.handleSubmit}>
                                <label> Deadline:
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Enter new deadline:"
                                        value={this.state.deadline}
                                        onChange={ (event) => this.setState({deadline: event.target.value}) }
                                        required
                                    />
                                </label>

                                {/* <input type="submit" value="Submit" disabled={false} />
                                <input type="button" value="withdrawAll" disabled={false} /> */}
                                <Button variant="secondary" className="m-3" type="submit" disabled={false}> Submit </Button>
                                <Button variant="secondary" className="pe-3" onClick={this.handleWithdrawClick}> withdrawAll </Button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Deadline;