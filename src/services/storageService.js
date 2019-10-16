import "./apiService.js";
import {success, failure} from "./api/mock/server";


// Get functions
export function getUserFromStorage() {
    let user;
    try {
        user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            return failure(null);
        }
    } catch (e) {
        console.log(e.toString());
        console.log('user failure');
        return failure(null);
    }

    return success(JSON.parse(localStorage.getItem('user')));
}

export function getWalletFromStorage() {
    let wallet;
    try {
        wallet = JSON.parse(localStorage.getItem('wallet'));
        if (wallet.id) {
            return success(wallet);
        }
    } catch (e) {
        console.log('wallet failure');
        return failure(null);
    }

    return success(JSON.parse(localStorage.getItem('wallet')));
}

export function getCardFormStorage() {
    let cards;
    try {
        cards = JSON.parse(localStorage.getItem('cards'));
        console.log(cards);
        console.log(typeof (cards));
        if (cards === null || cards === undefined || cards === "undefined" || cards === "undefined") {
            console.log("erreur");
            return failure("pas de cartes en mémoire")
        } else {
            return success(cards);
        }
    } catch (e) {
        console.log('cards failure');
        return failure(null);
    }

}

export function getPayInsFormStorage() {
    let payIns;
    try {
        payIns = JSON.parse(localStorage.getItem('payIns'));
        if (payIns[0].id) {
            return success(payIns);
        }
    } catch (e) {
        console.log('payIns failure');
        return failure(null);
    }

}

export function getPayOutsFormStorage() {
    let payOuts;
    try {
        payOuts = JSON.parse(localStorage.getItem('payOuts'));
        if (payOuts[0].id) {
            return success(payOuts);
        }
    } catch (e) {
        console.log('payOuts failure');
        return failure(null);
    }

}

// save functions
export function saveUserToStorage(user) {
    if (user === null || user === undefined) {
        return failure(user);
    } else {
        localStorage.setItem('user', JSON.stringify(user));
    }

    return success(user);
}

export function saveWalletToStorage(wallet) {
    localStorage.setItem('wallet', JSON.stringify(wallet));
}

export function saveCardsToStorage(cards) {
    if (cards === null || cards === undefined) {
        return failure(cards);
    } else {
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    return success(cards);
}

export function savePayOutsToStorage(payOuts) {
    if (payOuts === null || payOuts === undefined) {
        return failure(payOuts);
    } else {
        localStorage.setItem('payOuts', JSON.stringify(payOuts));
    }

    return success(payOuts);
}

export function savePayInsToStorage(payIns) {
    if (payIns === null || payIns === undefined) {
        return failure(payIns);
    } else {
        localStorage.setItem('payIns', JSON.stringify(payIns));
    }

    return success(payIns);
}

export function disconnect(props) {
    localStorage.clear();
    props.history.push('/login');
}

