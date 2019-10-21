import React, {Component} from 'react';
import {PayOutsErrors} from './PayOutsErrors.js';
import './Form.css';
import {Button, Form, FormGroup} from 'reactstrap';
import {getUserPayOuts} from "../../../services/userService";
import {doPayOut} from "../../../services/api/mock/server";
import CardBody from "reactstrap/es/CardBody";
import Card from "@material-ui/core/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";

class PayOutsContainer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            firstName: '',
            lastName: '',
            iban: '',
            amount: 0,
            formErrors: {firstName: '', lastName: '', iban: '', amount: ''},
            firstNameValid: false,
            lastNameValid: true,
            ibanValid: false,
            amountValid: false,
            formValid: false,
            payOuts:{}
        };
        this.state.payOuts = getUserPayOuts().result;
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        let value;
        if(name === 'amount' &&  e.target.value < 0){
            value = 0;
        } else{
            value = e.target.value;
        }
        this.setState({[name]: value}, () => {
            this.validateField(name, value)
        });
        localStorage.setItem(name, value);
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let ibanValid = this.state.ibanValid;
        let amountValid = this.state.amountValid;

        switch(fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^[a-zA-Z\s]+$/);
                fieldValidationErrors.firstName = firstNameValid ? '' : ' is invalid';
                break;
            case 'lastName':
                lastNameValid = value.match(/^[a-zA-Z\s]+$/);
                fieldValidationErrors.lastName = lastNameValid ? '' : ' is too short';
                break;
            case 'iban':
                ibanValid = true;
                fieldValidationErrors.iban = ibanValid ? '' : ' is too short';
                break;
            case 'amount':
                amountValid = true;
                fieldValidationErrors.amount = amountValid ? '' : ' is too short';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            ibanValid: ibanValid,
            amountValid : amountValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.firstNameValid &&
            this.state.lastNameValid &&
            this.state.ibanValid &&
            this.state.amountValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    onSubmit() {
        let payOuts = getUserPayOuts();
        doPayOut(this.state.amount);
    }

    render() {
        return (
            <div>
            <Form className="demoForm">
                <h2>Transferer vers un compte</h2>
                <div className="panel panel-default">
                    <PayOutsErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="row">
                    <FormGroup className="col-lg-5">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
                            <label htmlFor="firstName">Prenom</label>
                            <input type="text" required className="form-control" name="firstName"
                                   placeholder="Jean-Michel"
                                   value={this.state.firstName}
                                   onChange={this.handleUserInput}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="col-lg-5">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}>
                            <label htmlFor="lastName">Nom</label>
                            <input type="text" className="form-control" name="lastName"
                                   placeholder="Watermelon"
                                   value={this.state.lastName}
                                   onChange={this.handleUserInput}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="col-lg-10">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.iban)}`}>
                            <label htmlFor="iban">IBAN</label>
                            <input type="text" className="form-control" name="iban"
                                   placeholder="FR7630001007941234567890185 85"
                                   value={this.state.iban}
                                   onChange={this.handleUserInput}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="col-lg-4">
                        <div className={`form-group ${this.errorClass(this.state.formErrors.amount)}`}>
                            <label htmlFor="amount">Montant</label>
                            <input type="number" className="form-control" name="amount"
                                   placeholder="Montant"
                                   value={this.state.amount}
                                   onChange={this.handleUserInput}/>
                        </div>
                    </FormGroup>


                </div>
                <Button type="submit" onClick={() =>{this.onSubmit()}} className="btn btn-primary"
                        disabled={!this.state.formValid}> Envoyer</Button>
            </Form>

                <section className="payOutsList col-md-6">
                    <ul>
                        {this.state.payOuts.map(({ amount}) => (
                            <div className="col-lg-4">
                                <Card>
                                    <CardBody>
                                        <CardTitle>Transfert</CardTitle>
                                        <CardSubtitle>Montant: -{amount}</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </ul>
                </section>
            </div>
        )
    }
}

export default PayOutsContainer;
