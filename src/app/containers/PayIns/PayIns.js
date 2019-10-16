import React, {Component} from 'react';
import Button from "reactstrap/es/Button";
import {getUserFromStorage} from "../../../services/storageService";
import {getUserPayIns} from "../../../services/userService";

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
        if(this.state.user.status=== "success"){
            this.state.user = this.state.user.result;
        }else{
            this.props.push('/login');
        }
        this.state.payIns = getUserPayIns();
        console.log(this.state.payIns);
    }

    goToMakePayin(){
        this.props.history.push('/makeTransfert');
    }

    render() {
        return (
            <div>
                <Button onClick={() => {this.goToMakePayin();}} className='secondary'> Ajouter de l'argent</Button>
                <div>

                </div>
            </div>
        );
    }
}

export default PayIns;
