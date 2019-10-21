import {users} from './json/users.js';
import {cards} from './json/cards.js';
import {wallets} from './json/wallets.js';
import {payIns} from './json/payIns.js';
import {payOuts} from './json/payOuts.js';
import {transfers} from './json/transfers.js';
import {
    getCardFormStorage,
    getPayOutsFormStorage,
    getWalletFromStorage, saveCardsToStorage, savePayInsToStorage,
    savePayOutsToStorage, saveWalletToStorage
} from "../../storageService";
import {getUserPayIns, getUserPayOuts, getWallet} from "../../userService";

function wait(ms) {
    //sleep(ms)
}

export function success(result) {
    return {
        status: "success",
        result: result
    }
}

export function failure(error) {
    return {
        status: "failure",
        error: error
    }
}

// GET REQUESTS

export function getUserWallet(userId) {
    wait(100);
    for (let wallet of wallets) {
        if (wallet.user_id === userId) {
            return success(wallet)
        }
    }
    return failure("user not found, or has no wallet")
}

export function getTransfersMade(userId) {
    wait(100);

    const walletRes = JSON.parse(getUserWallet(userId));

    if (walletRes.status === "success") {
        const wallet = walletRes.result;
        const transfersMade = [];
        for (let transfer of transfers) {
            if (transfer.from_wallet_id === wallet.id) {
                transfersMade.push(transfer)
            }
        }

        return success(transfersMade)
    }

    return failure("user not found, or has no wallet")
}

export function getTransfersReceived(userId) {
    wait(100);

    const walletRes = JSON.parse(getUserWallet(userId));

    if (walletRes.status === "success") {
        const wallet = walletRes.result;
        const transfersMade = [];
        for (let transfer of transfers) {
            if (transfer.to_wallet_id === wallet.id) {
                transfersMade.push(transfer)
            }
        }

        return success(transfersMade)
    }

    return failure("user not found, or has no wallet")
}

export function getPayIns(userId) {
    wait(100);
    const walletRes = getUserWallet(userId);
    if (walletRes.status === "success") {
        const wallet = walletRes.result;
        const userPayIns = [];
        for (let payIn of payIns) {
            if (payIn.wallet_id === wallet.id) {
                userPayIns.push(payIn)
            }
        }

        return success(userPayIns)
    }

    return failure("user not found, or has no wallet")
}

export function getPayOuts() {
    wait(100);

    const walletRes = getWallet();

    if (walletRes.status === "success") {
        const wallet = walletRes.result;
        const userPayOuts = [];
        for (let payOut of payOuts) {
            if (payOut.wallet_id === wallet.id) {
                userPayOuts.push(payOut)
            }
        }

        return success(userPayOuts)
    }

    return failure("user not found, or has no wallet")
}

export function getCards(userId) {
    wait(100);

    const userCards = [];
    for (let card of cards) {
        if (card.user_id === userId) {
            userCards.push(card)
        }
    }

    return success(userCards)
}

export function authenticate(email, password) {
    wait(500);

    for (let user of users) {
        if (user.email === email && user.password === password) {
            return success(user)
        }
    }

    return failure("user not found, or wrong password")
}

export function getUserFromMail(email) {
    for (let user of users) {
        if (user.email === email) {
            return success(user)
        }
    }
    return failure("User not found")
}

// UPDATE REQUESTS

export function transfer(fromUserId, toUserId, amount) {
    wait(500);

    const fromWallet = JSON.parse(getUserWallet(fromUserId));
    const toWallet = JSON.parse(getUserWallet(toUserId));
    if (fromWallet.status === "success" && toWallet.status === "success") {
        const newId = transfers[transfers.length - 1].id + 1;
        const transfer = {
            id: newId,
            from_wallet_id: fromWallet.result.id,
            to_wallet_id: toWallet.result.id,
            amount: amount
        };
        fromWallet.result.balance -= amount;
        toWallet.result.balance += amount;
        transfers.push(transfer);
        return success(fromWallet);
    }

    return failure("at least one user_id not found")
}

export function doPayOut(amount) {
    let payOuts = getUserPayOuts().result;
    let wallet = getWallet().result;
    let payOut = {
        id: getMaxIdPayout(),
        wallet_id: wallet.id,
        amount: amount
    };
    payOuts.push(payOut);
    wallet.balance -= amount;
    savePayOutsToStorage(payOuts);
    saveWalletToStorage(wallet);
}


export function doPayIn(amount) {
    let payIns = getUserPayIns().result;
    let wallet = getWallet().result;
    let payIn = {
        id: getMaxIdPayout(),
        wallet_id: wallet.id,
        amount: amount
    };
    payIns.push(payIn);
    savePayInsToStorage(payIns);
    return (payIns);
}

export function editCard(cardId, brand, numbers, expiresAt) {
    let userCards = getCards().result;
    try {
        for (let card of cards) {
            if (card.id === cardId){
                card.brand = brand;
                card.last_four = numbers;
                card.expires_at = expiresAt;
                saveCardsToStorage(cards);
                return success(cards);
            }
        }
    } catch (e) {
        return failure('error');
    }
}


// get maxId
export function getMaxIdWallet() {

    let storedWallets = getWalletFromStorage();
    let success = storedWallets.status;
    storedWallets = storedWallets.result;
    let maximum = 0;
    if (success === "success") {
        for (let elem of storedWallets) {
            payOuts.push(elem);
        }
    }
    for (let variable of wallets) {
        if (variable.id > maximum) {
            maximum = variable.id;
        }
    }
    return maximum;
}

export function getMaxIdPayout() {
    let storedPayOut = getPayOutsFormStorage();
    let success = storedPayOut.status;
    storedPayOut = storedPayOut.result;
    let maximum = 0;
    if (success === "success") {
        for (let elem of storedPayOut) {
            payOuts.push(elem);
        }
    }

    for (let variable of payOuts) {
        if (variable.id > maximum) {
            maximum = variable.id;
        }
    }
    return maximum;
}

export function getMaxIdUser() {
    let vari = {maximum: 0};
    for (let variable of users) {
        if (variable.id > vari.maximum) {
            vari.maximum = variable.id;
        }
    }
    return vari.maximum;
}

export function getMaxIdCards() {
    let storedCards = getCardFormStorage();
    let success = storedCards.status;
    storedCards = storedCards.result;
    let maximum = 0;
    if (success === "success") {
        for (let elem of storedCards) {
            cards.push(elem);
        }
    }
    for (let variable of cards) {
        if (variable.id > maximum) {
            maximum = variable.user_id;
        }
    }
    return maximum;
}
