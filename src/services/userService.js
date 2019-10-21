import {getUserCards, getPayIns, getPayOuts} from "./apiService";
import "./apiService.js"
import {failure, getUserWallet, success} from "./api/mock/server";
import './storageService';
import {
        getCardFormStorage,
        getUserFromStorage,
        getWalletFromStorage,
        saveCardsToStorage,
        getPayInsFormStorage,
        getPayOutsFormStorage
} from "./storageService";
import {createCards, createPayIns, createWallet, createPayOuts} from "./createData";

export function saveUserToStorage(user) {
        //let user =  authenticate('toto1@ece.fr', 'toto1');
        localStorage.setItem('user', user);
        return true;
}

export function disconnect(props) {
        localStorage.clear();
        props.history.push('/login');
}

export function getWallet() {
        const wallet = getWalletFromStorage();
        if(wallet.status === "success") {
                return success(wallet.result);
        } else {
                const user = getUserFromStorage();
                if(user.status==="success") {
                        let userwallet = getUserWallet(user.result.id);
                        if(userwallet.status==="success") {
                                return success(userwallet.result);
                        } else {
                                return success(createWallet(user));
                        }

                }
        }
}

export function getCards() {
        const cards = getCardFormStorage();
        if(cards.status === "success") {
                return success(cards.result);
        } else {
                const user = getUserFromStorage();
                if(user.status==="success") {
                        let userCards = getUserCards(user.result.id);
                        if(userCards.status === "success") {
                                return success(userCards.result)
                        } else {
                                return success(createCards());
                        }
                }

        }
}


export function getUserPayIns() {
        const payIns = getPayInsFormStorage();
        if(payIns.status === "success") {
                return success(payIns.result);
        } else {
                const user = getUserFromStorage();
                if(user.status==="success") {
                        let payIns = getPayIns(user.result.id);
                        if(payIns.status==="success") {
                                return success(payIns.result);
                        } else {
                                return success(createPayIns(user));
                        }
                }
        }
}

export function getUserPayOuts() {
        const payIns = getPayOutsFormStorage();
        if(payIns.status === "success") {
                return success(payIns.result);
        } else {
                const user = getUserFromStorage();
                if(user.status==="success") {
                        let payOuts = getPayOuts(user.result.id);
                        if(payIns.status==="success") {
                                return success(payOuts.result);
                        } else {
                                return success(createPayOuts(user));
                        }

                }
        }
}




export function deleteCard(cardId) {
        let cards = getCards().result;

        for(let card of cards) {
                if(card.id === cardId) {
                        const index = cards.findIndex( (element) => {
                                return element.id === cardId;
                        });
                        cards.splice(index, 1);
                        saveCardsToStorage(cards);
                        return success(cards);
                }
        }
        return failure('no card deleted');
}
