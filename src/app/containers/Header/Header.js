import React, {Component} from 'react';
import './../services/userService';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Login from "../Login/Login";
import Menu from "../Menu/Menu";
import SendMoneyContainer from "../app/containers/SendMoneyContainer";

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Watermelon</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink><Link to="/menu">Home</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/login">Login</Link></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Route path="/login" component={Login}/>
                    <Route path="/menu" component={Menu}/>
                    <Route path="/SendMoneyContainer" component={SendMoneyContainer}/>
                </Router>
            </div>

        );
    }

}

export default Header;
