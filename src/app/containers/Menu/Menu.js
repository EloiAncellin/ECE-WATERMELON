import React, {Component} from 'react';
import '../../../services/storageService';
import { saveUserToStorage, disconnect} from "./../../../services/userService";
import './../SendMoney/SendMoneyContainer';
import {getWallet} from "../../../services/apiService";
import {getWalletFromStorage, getUserFromStorage} from "../../../services/storageService";
import {Redirect} from "react-router-dom";
import Header from "../Header/Header";

class Menu extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            destinataire: '',
            amount: 0,
            user: {},
            userWaller: {}
        };
        this.props = props;
        try{

        this.state.user = getUserFromStorage();

        if(this.state.user.status === "success"){
            this.state.user = this.state.user.result;
            console.log(this.state.user);
        }else{
            //this.props.history.push('/protected');
        }

        this.state.userWallet = getWalletFromStorage();
        if(this.state.userWallet.status === 'success'){
            this.state.userWallet = this.state.userWallet.result;
        }else{
            this.state.userWallet = getWallet(this.state.user.id).result;
        }

        if(this.state.userWallet === null || this.state.userWallet.status==='failure'){
            this.state.userWallet = getWallet(this.state.user.id).result;
        }
        localStorage.setItem('wallet', JSON.stringify(this.state.userWallet));
        }catch (e) {
            this.props.history.push('/protected');
        }

        //redirectIfNotAuth(props);
    }

    disconnect() {
        localStorage.clear();
        window.location.reload();
    }

    goToEnvoyerArgent() {
        /*return (
            <Redirect to='/SendMoneyContainer'/>
        );*/
        this.props.history.push('/SendMoneyContainer');
    }

    render() {
        return (
            <div>

                <div>
                    <p>User info : {this.state.user.first_name} {this.state.user.last_name}</p>
                    <p>Balance du compte : {this.state.userWallet.balance}</p>
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
