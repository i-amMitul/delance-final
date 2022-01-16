import React, {PureComponent} from "react";
import "./styles/home.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

class Requests extends PureComponent {
    /* we are receiving web3 and contract as props and storing title and amount
    as local states. We are then binding handleSubmit to this to make the form controlled
    (not sure why this is necessary but you receive an error if you dont do this) */
    constructor(props) {
        super(props);
        this.state = { title: "", amount: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // This function submit a request to the blockchain and update UI
    async handleSubmit(event) {
        event.preventDefault();

        const current_address = await this.props.web3.currentProvider.selectedAddress;
        // console.log(current_address);
        // console.log(this.state.title);
        // console.log(this.state.amount);
        const title = this.state.title;
        const amount = parseInt(this.state.amount);
        // console.log('calling create request function');
        try {
            await this.props.contract.methods.createRequest(title, amount).send({from: current_address});
            // console.log('succesfully executed create request function');
            alert('succesfully executed create request function');
        }
        catch(error){
            console.log(error);
            alert('error occured. try again or check account or parameters');
        }
    }

    render() {
        return (
            <div>
                {/* HEADER */}
                <Container fluid className="gradient1">
                    <h1> <Badge bg="none" text="success"> New Request </Badge> </h1>
                    <h4> <Badge bg="none" text="success"> Create your new request </Badge></h4>
                </Container>

                {/* CONTROLLED FORM */}
                {/* check this: https://www.w3schools.com/react/react_forms.asp */}
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label> Title:
                        <input
                            type="text"
                            name="title"
                            placeholder="enter job title"
                            value={this.state.title}
                            onChange={(event) => this.setState({title: event.target.value})}
                        />
                    </label>
                    <label> Amount:
                        <input
                            type="text"
                            name="amount"
                            placeholder="Enter amount:"
                            value={this.state.amount}
                            onChange={(event) => this.setState({amount: event.target.value})}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default Requests;