import React, {Component} from 'react';
import '../../../services/userService';
import {getUserFromStorage, saveUserToStorage, disconnect} from "./../../../services/userService";import {redirectIfNotAuth} from "./../../../services/GuardService";
import './../SendMoney/SendMoneyContainer';
import {getWallet} from "../../../services/apiService";

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
        this.userWallet = getWallet(this.user.id).result;
        console.log(this.userWallet);
        console.log(user);
        redirectIfNotAuth(props);
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

    goToEnvoyerArgent() {
        this.props.history.push('/SendMoneyContainer');
    }

    render() {
        return (
            <div>
                <div>
                    <p>User info : {this.user.first_name} {this.user.last_name}</p>
                    <p>Balance du compte : {this.userWallet.balance}</p>
                </div>
                <div>
                    <ul>
                        <li> Virer vers une banque</li>
                        <li> Gérer cartes</li>
                        <li onClick={ () => {this.goToEnvoyerArgent()}
                        }> Envoyer de l'argent</li>

                        <li onClick={() => {
                            this.disconnect()
                        }}> Déconnexion
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;
