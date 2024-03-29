import React, {Component} from 'react';
import {getUserFromStorage, saveCardsToStorage, saveWalletToStorage} from "../../../services/storageService";
import {getCards, getUserPayIns, getWallet} from "../../../services/userService";
import Card from "@material-ui/core/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardBody from "reactstrap/es/CardBody";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import {doPayIn} from "../../../services/api/mock/server";

class MakePayIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            card: "",
            wallet: {},
            payIns: {},
            amount: 0,
            cardId: 0
        };
        this.state.cardId = parseInt(localStorage.getItem("cardId"));

        const user = getUserFromStorage();
        this.state.user = user.result;
        let cards = getCards().result;
        for (let card of cards) {
            if (card.id === this.state.cardId) {
                this.state.card = card;
            }
        }
        this.state.payIns = getUserPayIns().result;
        this.state.wallet = getWallet().result;
        saveCardsToStorage(this.state.cards);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        let value;
        if(e.target.value>=0) {
            value = e.target.value;
        } else {
            value = 0;
        }
        this.setState({[name]: value});
        localStorage.setItem(name, value);
    };

    //goTo
    onSubmit(cardId) {
        doPayIn(parseInt(this.state.amount));
        this.state.wallet.balance = parseInt(this.state.wallet.balance);
        this.state.wallet.balance += parseFloat(this.state.amount);
        saveWalletToStorage(this.state.wallet);
        this.props.history.push('/transfert');
    }

    render() {
        return (
            <div>
                <section className="userList">
                    <ul>
                        <div className="col-lg-4">
                            <Card>
                                <CardBody>
                                    <CardTitle>{this.state.card.brand}</CardTitle>
                                    <CardSubtitle>XXXX XXXX XXXX {this.state.card.last_four}</CardSubtitle>
                                    <CardText>Date d'expiration: {this.state.card.expires_at}</CardText>
                                    <Input type={'number'}
                                           name={'amount'}
                                           value={this.state.amount}
                                           onChange={this.handleUserInput}/>
                                    <Button onClick={() => {
                                        this.onSubmit(this.state.card.id)
                                    }} className="danger">Utiliser</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </ul>
                </section>
            </div>
        );
    }
}

export default MakePayIn;
