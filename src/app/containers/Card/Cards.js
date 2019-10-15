import React, {Component} from 'react';
import Button from "reactstrap/es/Button";
import {getUserFromStorage} from "../../../services/storageService";
import {getCards} from "../../../services/apiService";
import Card from "@material-ui/core/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardBody from "reactstrap/es/CardBody";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";


class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cards: {}
        };

        const user = getUserFromStorage();
        this.state.user = user.result;
        this.state.cards = getCards(this.state.user.id).result;
        console.log(this.state.cards);
        console.log(this.state.user);
    }

    render() {

        return (
            <div>
                <Button>Ajouter une carte</Button>
                <section class="userList">
                    <ul>
                        {this.state.cards.map(({id, brand, last_four, expires_at}) => (
                            <div className="col-lg-4" href={`/users/${id}`}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{brand}</CardTitle>
                                        <CardSubtitle>{last_four}</CardSubtitle>
                                        <CardText> {expires_at}</CardText>
                                        <Button className="danger">Supprimer</Button>
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

export default Cards;
