import React, {Component} from 'react';
import '../../../services/userService';
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
import Menu from "../Menu/Menu";
import SendMoneyContainer from "./../SendMoney/SendMoneyContainer";
import Cards from "../Card/Cards";
import AddCard from "../Card/AddCard/AddCard";
import PayIns from "../PayIns/PayIns";
import MakePayIn from "../PayIns/MakePayin";
import EditCard from "../Card/EditCard/EditCard";
import PayOutsContainer from "../PayOuts/PayOutsContainer";
import Redirect from "react-router-dom/es/Redirect";

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

    disconnect() {
        localStorage.clear();
        window.location.reload();
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
                                    <NavLink><Link to="/sendMoney">Envoyer de l'argent</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/Cartes">Cartes</Link></NavLink>
                                </NavItem>
                                 <NavItem>
                                    <NavLink><Link to="./Transfert">Dépot</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="./SendToAccount">Retrait</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => {
                                        this.disconnect()
                                    }}>Deconnexion</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Route path="/menu" component={Menu}/>
                    <Route path="/sendMoney" component={SendMoneyContainer}/>
                    <Route path="/SendMoneyContainer" component={SendMoneyContainer}/>
                    <Route path="/Cartes" component={Cards}/>
                    <Route path="/addCard" component={AddCard}/>
                    <Route path="/Transfert" component={PayIns}/>
                    <Route path="/makeTransfert" component={MakePayIn}/>
                    <Route path="/EditCards" component={EditCard}/>
                    <Route path="/SendToAccount" component={PayOutsContainer}/>
                    <Redirect from="Header" to="/menu"/>
                </Router>
            </div>
        );
    }
}

export default Header;
