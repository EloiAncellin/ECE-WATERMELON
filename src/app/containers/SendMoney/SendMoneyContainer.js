import React from 'react';
import SendMoney from  './../components/SendMoney.js';

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
        alert('Vous avez envoyé à : ' + this.state.desti + ',  ' + this.state.amount + ' euros');
        event.preventDefault();
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
