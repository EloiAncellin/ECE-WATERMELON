import React, {Component} from 'react';
import {SignUpErrors} from './SignUpErrors.js';
import './Form.css';
import {Button, Form, FormGroup} from 'reactstrap';
import {authenticate} from "../../../services/apiService";
import {Redirect} from "react-router-dom";

class SignUpContainer extends Component {
    constructor(props) {
        super(props);
        this.props= props;
        this.state = {
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            formErrors: {email: '', password: '', firstName:'', lastName:''},
            emailValid: false,
            passwordValid: true,
            firstNameValid:true,
            lastNameValid:true,
            formValid: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
        localStorage.setItem(name,value);
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = true;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'lastName':
                lastNameValid=true;
                fieldValidationErrors.lastName= lastNameValid ? '' : 'is tooshort';
                break;
            case 'firstName':
                firstNameValid = true;
                fieldValidationErrors.firstName= firstNameValid ? '' : 'is tooshort';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid
        }, this.validateForm);
        console.log(this.state);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid &&
                this.state.passwordValid && this.state.firstNameValid &&
                this.state.lastNameValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    onSubmit(){
        const usr =
            {
                id: 100,
                email : this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            };
        console.log(usr);
        localStorage.setItem('user', JSON.stringify(usr));
        console.log(usr);
        return(<Redirect to='/menu'/>)

    }

    render() {
        return (
            <Form className="demoForm">
                <h2>Inscription</h2>
                <div className="panel panel-default">
                    <SignUpErrors formErrors={this.state.formErrors}/>
                </div>
                <FormGroup >
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" required className="form-control" name="email"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password"
                               placeholder="Password"
                               value={this.state.password}
                                onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className={`form-group `}>
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" className="form-control" name="lastName"
                               placeholder="Nom"
                               value={this.state.lastName}
                                onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" className="form-control" name="firstName"
                               placeholder="Prénom"
                               value={this.state.firstName}
                                onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>

                <Button type="submit" onSubmit={this.onSubmit()} className="btn btn-primary"
                        disabled={!this.state.formValid}>Sign up</Button>
            </Form>
        )
    }
}

export default SignUpContainer;
