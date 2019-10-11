import React from 'react';
import SendMoney from '../../components/SendMoney.js';
import {getUserFromMail, transfer} from "../../../services/apiService";
import {getUserFromStorage} from "../../../services/userService";


class SendMoneyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desti: '',
            amount: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === 'desti') {
            this.setState({desti: event.target.value});
        } else {
            this.setState({amount: event.target.value});
        }
    }

    handleSubmit(event) {
        let transferMade = this.doTransfer();
        if(transferMade){
            alert('Vous avez envoyé à : ' + this.state.desti + ',  ' + this.state.amount + ' euros');
        }else{
            alert('Erreur lors du transger');
        }
        event.preventDefault();
    }

    doTransfer(){
        const receiver = getUserFromMail(this.state.desti).result;
        const sender = getUserFromStorage();
        const userWallet = transfer(sender.id, receiver.id, this.state.amount);
        localStorage.setItem('wallet', userWallet);
        this.props.history.push('/menu');
        return true;
    }

    render() {
        return (
            <div>
                <SendMoney desti={this.state.desti} amount={this.state.amount} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </div>
            );
    }
}

export default SendMoneyContainer;
