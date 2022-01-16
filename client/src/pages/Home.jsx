import React, {PureComponent} from "react";
import "./styles/home.css";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

class Home extends PureComponent {
    /* we are receiving web3 and contract as props and storing address and deadline
    as local states. We are then binding handleSubmit to this to make the form controlled
    (not sure why this is necessary but you receive an error if you dont do this) */
    constructor(props) {
        super(props);
        this.state = {address: '', deadline: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* this function is used to manage home form. The form is controlled
    (react handle the input of the form fields at every instance). The function does
    not do anything of significane right now. It just logs some value to show it is working. */
    async handleSubmit(event){
        event.preventDefault();

        // console.log('address input:'  + this.state.address);
        // console.log('date input:', this.state.deadline);

        const balance = await this.props.web3.eth.getBalance(this.props.contract._address);
        // console.log(this.props.contract._address);
        console.log(balance);
        const ineth = await this.props.web3.utils.fromWei(balance, 'ether');
        console.log(ineth);

        try{
            alert('successfully submitted form. Check log for details');
        }
        catch(error){
            alert('error. please check details.');
        }
    }

    /* we are rendering the header and applying gradient to it. Then we render a controlled
    form to allow user to deploy form from the UI itself. We are using arrow function with
    onChange for short code. We do not need to bind the function and "this" this way. */
    render() {
        return (
            <div >
                {/* HEADER */}
                <Container fluid className="gradient1">
                    <h1> <Badge bg="none" text="success"> New Project </Badge>   </h1>
                    <h4> <Badge bg="none" text="success"> Create your new contract </Badge>  </h4>
                </Container>

                {/* CONTROLLED FORM */}
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label> Freelancer Address:
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter Freelancer Address:"
                            value={this.state.address}
                            onChange={ (event) => this.setState({address: event.target.value}) }
                            required
                        />
                    </label>

                    <label className="date"> Deadline:
                        <input
                            type="date"
                            name="deadline"
                            value={this.state.deadline}
                            onChange={ (event) => this.setState({deadline: event.target.value}) }
                        />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default Home;