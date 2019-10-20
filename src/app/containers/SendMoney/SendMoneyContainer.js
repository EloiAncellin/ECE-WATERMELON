import React from 'react';
import SendMoney from '../../components/SendMoney.js';
import {getUserFromMail, transfer} from "../../../services/apiService";
import {
    getUserFromStorage,
    saveWalletToStorage
} from "../../../services/storageService";
import {
    getWallet
} from "../../../services/userService";
import {Redirect} from "react-router-dom";



class SendMoneyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desti: '',
            amount: 0,
            userWallet:{},
            user:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

                this.props = props;
        try{

        this.state.user = getUserFromStorage();
        if(this.state.user.status === "success"){
            this.state.user = this.state.user.result;
        }else{
            this.props.history.push('/protected');
        }

        this.state.userWallet = getWallet();
        if(this.state.userWallet.status === 'success'){
            this.state.userWallet = this.state.userWallet.result;
        }else{
            this.state.userWallet = getWallet(this.state.user.id).result;
        }

        if(this.state.userWallet === null || this.state.userWallet.status==='failure'){
            this.state.userWallet = getWallet(this.state.user.id).result;
        }
        localStorage.setItem('wallet', JSON.stringify(this.state.userWallet));
        }catch (e) {
            this.props.history.push('/protected');
        }

    }


    handleChange(event) {
        if (event.target.name === 'desti') {
            this.setState({desti: event.target.value});
        } else {
            let value;
            if(event.target.value>=0){
            value = event.target.value;
        }else{
            value = 0;
        }
            this.setState({amount: value});
        }
    }

    handleSubmit(){
        this.state.amount = Number(this.state.amount);
        this.state.userWallet.balance-= this.state.amount;
        saveWalletToStorage(this.state.userWallet);
        const receiver = getUserFromMail(this.state.desti).result;
        const sender = this.state.user;
        const userWallet = transfer(sender.id, receiver.id, this.state.amount);
        userWallet.balance -= this.state.amount;
        localStorage.setItem('wallet', null);
        return(
            <Redirect to='/menu'/>
        );
    }

    render() {
        return (
            <div>
                <SendMoney balance={this.state.userWallet.balance} desti={this.state.desti} amount={this.state.amount} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </div>
            );
    }
}

export default SendMoneyContainer;
