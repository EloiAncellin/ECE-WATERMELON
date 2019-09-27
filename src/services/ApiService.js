import './mock/server.js'

export function authenticateUser(email, password){
    return JSON.parse(authenticateUser(email, password))
}

export function transfer(session, toEmail, amount){
    return JSON.parse(transfer(session, toEmail, amount))
}