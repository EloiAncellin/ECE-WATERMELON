import React, {Component} from 'react';
import '../../../services/storageService';
import './../SendMoney/SendMoneyContainer';
import {getUserFromStorage} from "../../../services/storageService";
import {getWallet} from "../../../services/userService";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardBody from "reactstrap/es/CardBody";
import Card from "@material-ui/core/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import "./../../styles/menu.css";

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
        try {
            this.state.user = getUserFromStorage();

            if (this.state.user.status === "success") {
                this.state.user = this.state.user.result;
            } else {
                //this.props.history.push('/protected');
            }

            this.state.userWallet = getWallet();
            if (this.state.userWallet.status === 'success') {
                this.state.userWallet = this.state.userWallet.result;
            } else {
                this.state.userWallet = getWallet(this.state.user.id).result;
            }

            if (this.state.userWallet === null || this.state.userWallet.status === 'failure') {
                this.state.userWallet = getWallet(this.state.user.id).result;
            }
            localStorage.setItem('wallet', JSON.stringify(this.state.userWallet));
        } catch (e) {
            this.props.history.push('/protected');
        }

        //redirectIfNotAuth(props);
    }

    disconnect() {
        localStorage.clear();
        window.location.reload();
    }

    goToEnvoyerArgent() {
        this.props.history.push('/SendMoneyContainer');
    }

    goToCards() {
        this.props.history.push('/Cartes');
    }
    goToDepot() {
        this.props.history.push('/Transfert');
    }

    render() {
        return (
            <div className="container col-lg-4">
                <div className="row ">
                    <Card className=" test offset-3">
                        <CardBody>
                            <CardTitle>{this.state.user.first_name} {this.state.user.last_name} </CardTitle>
                            <CardSubtitle>Balance du compte : {this.state.userWallet.balance}</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
                <div className="bonjour">
                    <Paper onClick={ () => {this.goToDepot()}}>
                        <Typography variant="h6" component="h2">
                            Déposer de l'argent
                        </Typography>
                    </Paper>
                    <Paper onClick={() => {
                        this.goToCards()
                    }}>
                        <Typography variant="h6" component="h2">
                            Gérer cartes
                        </Typography>
                    </Paper>
                    <Paper onClick={() => {
                        this.goToEnvoyerArgent()
                    }}>
                        <Typography variant="h6" component="h3">
                            Envoyer de l'argent
                        </Typography>
                    </Paper>
                    <Paper onClick={() => {
                        this.disconnect()
                    }}>
                        <Typography variant="h6" component="h3">
                            Deconnexion
                        </Typography>
                    </Paper>

                </div>
            </div>
        );
    }
}

export default Menu;
