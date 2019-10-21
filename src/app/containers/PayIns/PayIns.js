import React, {Component} from 'react';
import {getUserFromStorage, savePayInsToStorage} from "../../../services/storageService";
import {getCards, getUserPayIns} from "../../../services/userService";
import Card from "@material-ui/core/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import "./../../styles/payIn.css"

class PayIns extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            user: {},
            payIns: {},
            cards: {}
        };
        console.log("test");
        this.state.user = getUserFromStorage();
        console.log(this.state.user);
        if (this.state.user.status === "success") {
            this.state.user = this.state.user.result;
        } else {
            this.props.history.push('/login');
        }
        this.state.payIns = getUserPayIns().result;
        this.state.cards = getCards().result;
        savePayInsToStorage(this.state.payIns);
        console.log(this.state.payIns);
    }


    goToMakePayin(cardId) {
        localStorage.setItem("cardId", cardId);
        this.props.history.push('/makeTransfert');
    }

    render() {
        return (
            <div className="cardsList offset-4 col-lg-4">
                <h2>
                    Cliquez pour utiliser une carte
                </h2>
                {this.state.cards.map(({id, brand}) => (
                    <Card>
                        <CardBody onClick={() => {
                            this.goToMakePayin(id)
                        }}>
                            <CardSubtitle>
                                {brand}
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                ))}
                <br/>
                <section className="payInsList">
                    <h2>Liste des dépots</h2>
                    {this.state.payIns.map(({id, amount}) => (
                        <div>
                            <Card>
                                <CardBody>
                                    <CardTitle>Dépot </CardTitle>
                                    <CardSubtitle>Montant: +{amount}</CardSubtitle>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </section>
            </div>
        );
    }
}

export default PayIns;
