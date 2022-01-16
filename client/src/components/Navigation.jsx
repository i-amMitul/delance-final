import React, {PureComponent} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

class Navigation extends PureComponent {
    state = {address: null};

    // Navbar for the website
    render() {
        return (
            <Navbar variant="dark" bg="dark" expand="lg" text="white">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px', }}
                            navbarScroll
                            text = "white"
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/requests"> Requests </Nav.Link>
                            <Nav.Link href="/details"> Details </Nav.Link>
                            <Nav.Link href="/deadline"> Deadline </Nav.Link>
                            <Nav.Link href="#" className="me-0" > Address: {this.state.address} </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    componentDidMount = async () => {
        let address = await this.props.web3.currentProvider.selectedAddress;
        this.setState({address: address});
    };
}

export default Navigation;