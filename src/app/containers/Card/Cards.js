import React, {Component} from 'react';
import Button from "reactstrap/es/Button";
import {getUserFromStorage, saveCardsToStorage} from "../../../services/storageService";
import {deleteCard, getCards} from "../../../services/userService";
import Card from "@material-ui/core/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardBody from "reactstrap/es/CardBody";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";

class Cards extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            user: {},
            cards: {}
        };

        const user = getUserFromStorage();
        this.state.user = user.result;
        this.state.cards = getCards().result;
        saveCardsToStorage(this.state.cards);
    }

    goToAddCard() {
        this.props.history.push('/addCard');
    }

    deleteCard(cardId) {
        let cards = deleteCard(cardId);
        if (cards.status === "success") {
            this.state.cards = cards.result;
            this.forceUpdate();
        }
    }

    editCard(cardId) {
        localStorage.setItem('cardId', cardId);
        this.props.history.push('/EditCards');
    }

    render() {
        return (
            <div className="offset-4">
                <section className="userList">
                    <h2 className="offset-1">Vos cartes</h2>
                    <ul>
                        {this.state.cards.map(({id, brand, last_four, expires_at}) => (
                            <div className="col-lg-6">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{brand}</CardTitle>
                                        <CardSubtitle>XXXX XXXX XXXX {last_four}</CardSubtitle>
                                        <CardText>Date d'expiration: {expires_at}</CardText>
                                        <Button onClick={() => {
                                            this.editCard(id)
                                        }} className="danger"> Modifier</Button>
                                        <Button onClick={() => {
                                            this.deleteCard(id)
                                        }} color="danger" className="danger">Supprimer</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </ul>
                </section>
                <Button className="offset-1" onClick={() => {
                    this.goToAddCard()
                }}>Ajouter une carte</Button>

            </div>
        );
    }


}

export default Cards;
