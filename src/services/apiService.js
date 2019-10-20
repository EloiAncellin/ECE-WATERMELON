import * as mock from './api/mock/server.js'


export function getWallet(userId){
    return mock.getUserWallet(userId);
}

export function getTransfersMade(userId){
    return mock.getTransfersMade(userId)
}

export function getTransfersReceived(userId){
    return mock.getTransfersReceived(userId)
}

export function getPayIns(userId){
    return mock.getPayIns(userId)
}

export function getPayOuts(userId){
    return mock.getPayOuts(userId)
}

export function getUserCards(userId){
    return mock.getCards(userId)
}

export function authenticate(email, password){
    return mock.authenticate(email, password)
}

export function transfer(fromUserId, toUserId, amount){
    return mock.transfer(fromUserId, toUserId, amount)
}

export function getUserFromMail(email){
    return mock.getUserFromMail(email);
}

export function editCard(cardId, brand, numbers, expiresAt){
    return mock.editCard(cardId, brand, numbers, expiresAt);
}
