import React, {Component} from 'react';
import {EditCardErrors} from './EditCardErrors.js';
import './Form.css';
import {Button, Form, FormGroup} from 'reactstrap';
import {getMaxIdCards} from "../../../../services/api/mock/server";
import {getUserFromStorage, saveCardsToStorage} from "../../../../services/storageService";
import {getCards} from "../../../../services/userService";

class EditCard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            marque: '',
            numbers: '',
            endDate: '',
            formErrors: {marque: '', numbers: '', endDate: ''},
            marqueValid: false,
            numbersValid: true,
            endDateValid: true,
            formValid: false,
            card: {}
        };
        this.cardId = parseInt(localStorage.getItem('cardId'));
        this.cards = getCards().result;
        for (let variable of this.cards) {
            if (this.cardId === variable.id) {
                this.state.card = variable;
            }
        }
        this.state.marque = this.state.card.brand;
        this.state.numbers = this.state.card.last_four;
        this.state.endDate = this.state.card.expires_at;
        console.log(this.state.card);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
        localStorage.setItem(name, value);
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let marqueValid = this.state.marqueValid;
        let numbersValid = this.state.numbersValid;
        let endDateValid = this.state.endDateValid;

        switch (fieldName) {
            case 'marque':
                marqueValid = true;
                fieldValidationErrors.marque = marqueValid ? '' : ' is invalid';
                break;
            case 'numbers':
                numbersValid = true;
                fieldValidationErrors.numbers = numbersValid ? '' : ' is too short';
                break;
            case 'endDate':
                endDateValid = true;
                fieldValidationErrors.endDate = endDateValid ? '' : 'is tooshort';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            marqueValid: marqueValid,
            numbersValid: numbersValid,
            endDateValid: endDateValid
        }, this.validateForm);
        console.log(this.state);
    }

    validateForm() {
        this.setState({
            formValid: this.state.marqueValid &&
                this.state.numbersValid &&
                this.state.endDateValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    onSubmit() {
        console.log("rbgrebger");
        let maxId = getMaxIdCards() + 1;
        let userCards = getCards().result;
        const card =
            {
                id: maxId,
                last_four: "1111",
                brand: this.state.marque,
                expires_at: this.state.endDate,
                user_id: getUserFromStorage().result.id
            };
        userCards.push(card);
        saveCardsToStorage(userCards);
        this.props.history.push('/Cartes');

    }

    goToCards(){
        this.props.history.push('/Cartes');
    }

    render() {
        return (

            <Form className="demoForm">
                <h2>Modifier une carte</h2>
                <h3>{this.state.card.brand}</h3>
                <div className="panel panel-default">
                    <EditCardErrors formErrors={this.state.formErrors}/>
                </div>
                <FormGroup>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.marque)}`}>
                        <label htmlFor="marque">Marque</label>
                        <input type="marque" required className="form-control" name="marque"
                               placeholder="Marque"
                               value={this.state.marque}
                               onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.numbers)}`}>
                        <label htmlFor="numbers">Numéros</label>
                        <input type="numbers" className="form-control" name="numbers"
                               placeholder="XXXX XXXX XXXX XXXX XXXX"
                               value={this.state.numbers}
                               onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.endDate)}`}>
                        <label htmlFor="endDate">Date de fin</label>
                        <input type="text" className="form-control" name="endDate"
                               placeholder="XX/XX/XXXX"
                               value={this.state.endDate}
                               onChange={this.handleUserInput}/>
                    </div>
                </FormGroup>
                <Button onClick={ ()=>{this.goToCards()}} className="btn btn-primary">Annuler</Button>
                <Button onClick={() => {
                    this.onSubmit();
                }} className="btn btn-primary"
                        disabled={!this.state.formValid}>Modifier</Button>
            </Form>
        )
    }
}

export default EditCard;
