import {mockGetTransfersMade, mockAuthenticateUser, mockTransfer} from './api/mock/server.js'

export function getTransfersMade(userId){
    return JSON.parse(mockGetTransfersMade(userId))
}

export function authenticateUser(email, password){
    return JSON.parse(mockAuthenticateUser(email, password))
}

export function transfer(session, toEmail, amount){
    return JSON.parse(mockTransfer(session, toEmail, amount))
}
