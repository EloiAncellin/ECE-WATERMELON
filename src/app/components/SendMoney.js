import React from 'react';


    class SendMoney extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Destinataire:
                    <input name='desti' type="text" value={this.props.desti} onChange={this.props.handleChange} />
                </label>
                <label>
                    Quantité:
                    <input name='amount' type="float" value={this.props.amount} onChange={this.props.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default SendMoney;
