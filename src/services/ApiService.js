import {mockAuthenticateUser, mockTransfer} from './api/mock/server.js'

export function authenticateUser(email, password){
    return JSON.parse(mockAuthenticateUser(email, password))
}

export function transfer(session, toEmail, amount){
    return JSON.parse(mockTransfer(session, toEmail, amount))
}
