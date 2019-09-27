import {users} from './json/users.js';
import {cards} from './json/cards.js';
import {wallets} from './json/wallets.js';
import {payIns} from './json/payIns.js';
import {payOuts} from './json/payOuts.js';
import {transfers} from './json/transfers.js';

function wait(ms){
    //sleep(ms)
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

export function mockAuthenticateUser(email, password){
    wait(500)

    for(let user of users){
        if(user.email === email && user.password === password){
            return success(user)
        }
    }

    return failure("user not found, or wrong password")
}

export function mockGetUserWallet(userId){
    wait(100)

    for(let wallet of wallets){
        if(wallet.user_id === userId){
            return success(wallet)
        }
    }

    return failure("user not found, or has no wallet")
}

export function mockTransfer(fromUserId, toUserId, amount){
    wait(500)

    const fromWalletId = JSON.parse(mockGetUserWallet(fromUserId))
    const toWalletId = JSON.parse(mockGetUserWallet(toUserId))

    if(fromWalletId.status === "success" && toWalletId.status === "success"){
        const newId = transfers[transfers.size - 1].id + 1
        const transfer = {
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