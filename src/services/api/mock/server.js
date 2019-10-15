import {users} from './json/users.js';
import {cards} from './json/cards.js';
import {wallets} from './json/wallets.js';
import {payIns} from './json/payIns.js';
import {payOuts} from './json/payOuts.js';
import {transfers} from './json/transfers.js';

function wait(ms){
    //sleep(ms)
}

export function success(result){
    return {
        status: "success",
        result: result
    }
}

export function failure(error){
    return {
        status: "failure",
        error: error
    }
}

// GET REQUESTS


export function getUserWallet(userId){
    wait(100)

    for(let wallet of wallets){
        if(wallet.user_id === userId){
            return success(wallet)
        }
    }
    return failure("user not found, or has no wallet")
}

export function getTransfersMade(userId){
    wait(100)

    const walletRes = JSON.parse(getUserWallet(userId))

    if(walletRes.status === "success"){
        const wallet = walletRes.result
        const transfersMade = []
        for(let transfer of transfers){
            if(transfer.from_wallet_id === wallet.id){
                transfersMade.push(transfer)
            }
        }

        return success(transfersMade)
    }

    return failure("user not found, or has no wallet")
}

export function getTransfersReceived(userId){
    wait(100)

    const walletRes = JSON.parse(getUserWallet(userId))

    if(walletRes.status === "success"){
        const wallet = walletRes.result
        const transfersMade = []
        for(let transfer of transfers){
            if(transfer.to_wallet_id === wallet.id){
                transfersMade.push(transfer)
            }
        }

        return success(transfersMade)
    }

    return failure("user not found, or has no wallet")
}

export function getPayIns(userId){
    wait(100)

    const walletRes = JSON.parse(getUserWallet(userId))

    if(walletRes.status === "success"){
        const wallet = walletRes.result
        const userPayIns = []
        for(let payIn of payIns){
            if(payIn.wallet_id === wallet.id){
                userPayIns.push(payIn)
            }
        }

        return success(userPayIns)
    }

    return failure("user not found, or has no wallet")
}

export function getPayOuts(userId){
    wait(100)

    const walletRes = JSON.parse(getUserWallet(userId))

    if(walletRes.status === "success"){
        const wallet = walletRes.result
        const userPayOuts = []
        for(let payOut of payOuts){
            if(payOut.wallet_id === wallet.id){
                userPayOuts.push(payOut)
            }
        }

        return success(userPayOuts)
    }

    return failure("user not found, or has no wallet")
}

export function getCards(userId){
    wait(100)

    const userCards = []
    for(let card of cards){
        if(card.user_id == userId){
            userCards.push(card)
        }
    }

    return success(userCards)
}

export function authenticate(email, password){
    wait(500)

    for(let user of users){
        if(user.email === email && user.password === password){
            return success(user)
        }
    }

    return failure("user not found, or wrong password")
}

export function getUserFromMail(email){
    for(let user of users){
        if (user.email === email){
            return success(user)
        }
    }
    return failure("User not found")
}

// UPDATE REQUESTS

export function transfer(fromUserId, toUserId, amount){
    wait(500)

    const fromWallet = JSON.parse(getUserWallet(fromUserId));
    const toWallet = JSON.parse(getUserWallet(toUserId));
    console.log(fromUserId);
    console.log(toUserId);
    if(fromWallet.status === "success" && toWallet.status === "success"){
        const newId = transfers[transfers.length - 1].id + 1
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


// get maxId
export function getMaxIdWallet(){
    let maximum = 0;
    for(let variable of wallets){
        if(variable.user_id > maximum){
            maximum = variable.user_id;
        }
    }
    return maximum;
}


export function getMaxIdUser(){
    let maximum = 0;
    for(let variable of users){
        if(variable.user_id > maximum){
            maximum = variable.user_id;
        }
    }
    return maximum;
}
