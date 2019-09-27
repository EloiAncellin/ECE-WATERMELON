import {users} from './json/User.js';
import {cards} from './json/Card.js';
import {wallets} from './json/Wallet.js';
import {payIns} from './json/PayIn.js';
import {payOuts} from './json/PayOut.js';
import {transfers} from './json/Transfer.js';

function wait(ms){
    sleep(ms)
}

function success(result){
    return JSON.stringify({
        status: "success",
        result: result
    })
}

function failure(error){
    return JSON.stringify({
        status: "failure",
        error: error
    })
}

export function authenticateUser(email, password){
    wait(500)

    for(let user of users){
        if(user.email === email && user.password === password){
            return success(user)
        }
    }

    return failure("user not found, or wrong password")
}

export function getUserWallet(userId){
    wait(100)

    for(let wallet of wallets){
        if(wallet.user_id === userId){
            return success(wallet)
        }
    }

    return failure("user not found, or has no wallet")
}

export function transfer(fromUserId, toUserId, amount){
    wait(500)

    const fromWalletId = JSON.parse(getUserWallet(fromUserId))
    const toWalletId = JSON.parse(getUserWallet(toUserId))

    if(fromWalletId.status === "success" && toWalletId.status === "success"){
        const newId = transfers[transfers.size - 1].id + 1
        transfer = {
            id: newId,
            from_wallet_id: fromWalletId,
            to_wallet_id: toWalletId,
            amount: amount
        }
        transfers.push(transfer)
        return success(transfer)
    }

    return failure("at least one user_id not found")
}
