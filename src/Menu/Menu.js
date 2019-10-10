import React, {Component} from 'react';
import './../services/userService';
import {getUserFromStorage, saveUserToStorage, disconnect} from "../services/userService";
import './../services/GuardService';
import {redirectIfNotAuth} from "../services/GuardService";
import './../SendMoney/SendMoney';
import AlertDialog from "../SendMoney/SendMoney";


class Menu extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            destinataire: '',
            amount: 0
        };
        saveUserToStorage();
        let user = getUserFromStorage();
        this.user = user;
        console.log(user);
        console.log(this.user.first_name);
        redirectIfNotAuth(props);
        this.envoyerArgent = this.envoyerArgent.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    disconnect() {
        disconnect(this.props);
    }

    handleUserInput = (e) => {
        console.log(e.target.name);
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'destinataire':
                this.state.destinataire = name;
                break;
            case 'amount':
                this.state.amount = value;
                break;
            default:
                break;
        }
    }

    envoyerArgent() {
        console.log('bonjour');
    }

    render() {
        return (
            <div>
                <div>
                    <p>User info : {this.user.first_name} {this.user.last_name}</p>
                </div>
                <div>
                    <Router>
                        <Nav className="ml-auto" navbar>

                            <ul>
                                <li> Virer vers une banque</li>
                                <li> Gérer cartes</li>
                                <AlertDialog/>

                                <li onClick={() => {
                                    this.disconnect()
                                }}> Déconnexion
                                </li>
                            </ul>
                        </Nav>
                        <Route path="/login" component={Login}/>
                    <Route path="/menu" component={Menu}/>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Menu;
