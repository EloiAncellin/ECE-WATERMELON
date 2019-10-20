import React from 'react';
import Button from "reactstrap/es/Button";
import Card from "@material-ui/core/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardBody from "reactstrap/es/CardBody";
import "./../styles/sendMoney.css";

class SendMoney extends React.Component {

    render() {
        return (
            <div>
                <div className="container sendMoney col-lg-4">

                    <Card className=" test offset-3">
                        <CardBody>
                            <CardTitle>Solde : {this.props.balance} </CardTitle>
                        </CardBody>
                    </Card>
                    <br/>
                    <form className="offset-4" onSubmit={this.props.handleSubmit}>
                        <div className="row">
                            <div>
                                <label htmlFor="desti">
                                    Destinataire:</label>
                                <br/>
                                <input name='desti' type="text" placeholder="Destinataire" value={this.props.desti}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="amount">
                                    Montant:</label>
                                <br/>
                                <input name='amount' type="number" value={this.props.amount}
                                       onChange={this.props.handleChange}/>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <Button className="offset-3 btn btn-primary" type="submit" value="Submit">Envoyer</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SendMoney;
