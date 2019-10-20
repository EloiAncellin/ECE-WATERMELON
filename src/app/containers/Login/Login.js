import React, {Component} from 'react';
import {LoginErrors} from './LoginErrors.js';
import './Form.css';
import {Button, Form, FormGroup} from 'reactstrap';
import {authenticate} from "../../../services/apiService";
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props= props;
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: true,
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

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = true;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);

    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    onSubmit(){
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const user = authenticate(email, password);
        localStorage.setItem('user', JSON.stringify(user.result));
        //this.props.history.push('/protected');
        return(<Redirect to='/menu'/>)
    }

    render() {
        return (
            <Form className="demoForm">
                <h2>Se connecter</h2>
                <div className="panel panel-default">
                    <LoginErrors formErrors={this.state.formErrors}/>
                </div>
                <FormGroup onSubmit={this.onSubmit}>
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

                <Button type="submit" onSubmit={this.onSubmit()} className="btn btn-primary"
                        disabled={!this.state.formValid}>Sign up</Button>
            </Form>
        )
    }
}

export default Login;
