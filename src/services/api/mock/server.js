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
        let transfersMade = []
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
        let transfersMade = []
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
        let userPayIns = []
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
        let userPayOuts = []
        for(let payOut of payOuts){
            if(payOut.wallet_id === wallet.id){
                userPayOuts.push(payOut)
            }
        }

        return success(userPayOuts)
    }

    return failure("user not found, or has no wallet")
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

// UPDATE REQUESTS

export function transfer(fromUserId, toUserId, amount){
    wait(500)

    const fromWalletId = JSON.parse(getUserWallet(fromUserId))
    const toWalletId = JSON.parse(getUserWallet(toUserId))

    if(fromWalletId.status === "success" && toWalletId.status === "success"){
        const newId = transfers[transfers.size - 1].id + 1
        const transfer = {
            id: newId,
            from_wallet_id: fromWalletId.result.id,
            to_wallet_id: toWalletId.result.id,
            amount: amount
        }
        transfers.push(transfer)
        return success(transfer)
    }

    return failure("at least one user_id not found")
}
