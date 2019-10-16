import "./apiService.js";
import {success, failure} from "./api/mock/server";


// Get functions
export function getUserFromStorage(){
    let user;
    try{
        user = JSON.parse(localStorage.getItem('user'));
        if(user === null){
            return failure(null);
        }
    }catch(e){
        console.log(e.toString());
        console.log('user failure');
        return failure(null);
    }

    return  success(JSON.parse(localStorage.getItem('user')));
}

export function getWalletFromStorage(){
    let wallet;
    try{
        wallet = JSON.parse(localStorage.getItem('wallet'));
        if(wallet.id){
            return success(wallet);
        }
    }catch(e){
        console.log('wallet failure');
        return failure(null);
    }

    return  success(JSON.parse(localStorage.getItem('wallet')));
}

export function getCardFormStorage(){
     let cards;
    try{
        cards = JSON.parse(localStorage.getItem('cards'));
        if(cards[0].id){
            return success(cards);
        }
    }catch(e){
        console.log('cards failure');
        return failure(null);
    }

}

export function getPayInsFormStorage(){
     let payIns;
    try{
        payIns = JSON.parse(localStorage.getItem('payIns'));
        if(payIns[0].id){
            return success(payIns);
        }
    }catch(e){
        console.log('payIns failure');
        return failure(null);
    }

}


// save functions
export function saveUserToStorage(user){
        if(user === null || user === undefined){
            return failure(user);
        }else{
            localStorage.setItem('user', JSON.stringify(user));
        }

    return success(user);
}

export function saveWalletToStorage(wallet){
        if(wallet === null || wallet === undefined){
            return failure(wallet);
        }else{
            localStorage.setItem('wallet', JSON.stringify(wallet));
        }

    return success(wallet);
}

export function saveCardsToStorage(cards){
    console.log(cards);
    if(cards === null || cards === undefined){
            return failure(cards);
        }else{
            localStorage.setItem('cards', JSON.stringify(cards));
        }

    return success(cards);
}


export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}

