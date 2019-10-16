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
            cards: {},
            wallet:{},
            payIns:{},
            amount:0
        };
        const user = getUserFromStorage();
        this.state.user = user.result;
        this.state.cards = getCards().result;
        this.state.payIns = getUserPayIns().result;
        console.log(this.state.payIns);
        this.state.wallet = getWallet().result;
        saveCardsToStorage(this.state.cards);
        this.onSumbit = this.onSumbit.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        localStorage.setItem(name,value);
        console.log(this.state);
    };
    //goTo
    onSumbit(cardId){
        console.log(cardId);
        let test = getUserPayIns();
        console.log(test.result);
        doPayIn(parseInt(this.state.amount));
        this.state.wallet.balance = parseInt(this.state.wallet.balance);
        this.state.wallet.balance += parseInt(this.state.amount);
        saveWalletToStorage(this.state.wallet);
    }

    render() {
        return (
            <div>
                <section className="userList">
                    <ul>
                        {this.state.cards.map(({id, brand, last_four, expires_at}) => (
                            <div className="col-lg-4">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{brand}</CardTitle>
                                        <CardSubtitle>XXXX XXXX XXXX {last_four}</CardSubtitle>
                                        <CardText>Date d'expiration: {expires_at}</CardText>
                                        <Input type={'number'}
                                               name={'amount'}
                                               value={this.state.amount}
                                               onChange={this.handleUserInput} />
                                        <Button onClick={() => {
                                            this.onSumbit(id)
                                        }} className="danger">Utiliser</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </ul>
                </section>
            </div>
        );
    }
}

export default MakePayIn;
