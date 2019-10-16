import React, {Component} from 'react';
import Button from "reactstrap/es/Button";
import {getUserFromStorage, savePayInsToStorage} from "../../../services/storageService";
import {getUserPayIns} from "../../../services/userService";
import Card from "@material-ui/core/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";

class PayIns extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
          user:{},
          payIns:{}
        };
        console.log("test");
        this.state.user = getUserFromStorage();
        console.log(this.state.user);
        if(this.state.user.status=== "success"){
            this.state.user = this.state.user.result;
        }else{
            this.props.history.push('/login');
        }
        this.state.payIns = getUserPayIns().result;
        savePayInsToStorage(this.state.payIns);
        console.log(this.state.payIns);
    }

    goToMakePayin(){
        this.props.history.push('/makeTransfert');
    }

    render() {
        return (
            <div>
                <Button onClick={() => {this.goToMakePayin();}} className='secondary'> Ajouter de l'argent</Button>
                <section className="userList">
                   <ul>
                        {this.state.payIns.map(({id, amount}) => (
                            <div className="col-lg-4">
                                <Card>
                                    <CardBody>
                                        <CardTitle>Dépot </CardTitle>
                                        <CardSubtitle>Montant: +{amount}</CardSubtitle>
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

export default PayIns;
