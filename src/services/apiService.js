import * as mock from './api/mock/server.js'

export function getTransfersMade(userId){
    return JSON.parse(mock.getTransfersMade(userId))
}

export function getTransfersReceived(userId){
    return JSON.parse(mock.getTransfersReceived(userId))
}

export function getPayIns(userId){
    return JSON.parse(mock.getPayIns(userId))
}

export function getPayOuts(userId){
    return JSON.parse(mock.getPayOuts(userId))
}

export function getCards(userId){
    return JSON.parse(mock.getCards(userId))
}

export function authenticate(email, password){
    return JSON.parse(mock.authenticate(email, password))
}

export function transfer(fromUserId, toUserId, amount){
    return JSON.parse(mock.transfer(fromUserId, toUserId, amount))
}
