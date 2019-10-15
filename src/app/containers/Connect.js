import React, {Component} from 'react';
import {Button} from 'reactstrap';
import SignUp from "../components/SignUp";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Login from "./Login/Login";
import SignUpContainer from "./SignUp/SignUpContainer";


class Connect extends Component {

    render(){
        return(
          <div>
                <Router>
                    <Navbar color="light" light expand="md">
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink><Link to="/login"><Button color="secondary" >Se connecter</Button></Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/signup"><Button color="secondary" >S'inscrire</Button></Link></NavLink>
                                </NavItem>
                            </Nav>
                    </Navbar>
                    <Route path="/signup" component={SignUpContainer}/>
                    <Route path="/login" component={Login}/>

                </Router>
            </div>
        );
    }
}

export default Connect;
