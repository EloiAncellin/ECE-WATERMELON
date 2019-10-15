import {getUserCards} from "./apiService";
import "./apiService.js"
import {failure, getUserWallet, success} from "./api/mock/server";
import './storageService';
import {getCardFormStorage, getUserFromStorage, getWalletFromStorage, saveCardsToStorage} from "./storageService";
import {createCards, createWallet} from "./createData";

export function saveUserToStorage(user){
        //let user =  authenticate('toto1@ece.fr', 'toto1');
        localStorage.setItem('user', user);
        return true;
}

export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}

export function getWallet(){
        const wallet = getWalletFromStorage();
        if(wallet.status === "success"){
                return success(wallet.result);
        }else{
                const user = getUserFromStorage();
                if(user.status==="success"){
                        let userwallet = getUserWallet(user.result.id);
                        if(userwallet.status==="success"){
                                return success(userwallet.result);
                        }else{
                                return success(createWallet(user));
                        }

                }
        }
}

export function getCards(){
        const cards = getCardFormStorage();
        if(cards.status === "success"){
                return success(cards.result);
        }else{
                const user = getUserFromStorage();
                if(user.status==="success"){
                        let userCards = getUserCards(user.result.id);
                        if(userCards.status === "success"){
                                return success(userCards.result)
                        }else{
                                return success(createCards());
                        }
                }

        }
}

export function deleteCard(cardId){
        let cards = getCards().result;
        for(let card of cards){
                if(card.id === cardId){
                        const index = cards.findIndex( (element) => {
                                return element.id === cardId;
                        });
                        cards.splice(index);
                        saveCardsToStorage(cards);
                        return success(cards);
                }
        }
        return failure('no card deleted');
}
