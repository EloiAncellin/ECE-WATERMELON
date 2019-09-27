import {ApiSimulation} from './ApiSimulation.js'

export class ApiService{
    static authenticateUser(email, password){
        return JSON.parse(ApiSimulation.authenticateUser(email, password))
    }

    static transfer(session, toEmail, amount){
        return JSON.parse(ApiSimulation.transfer(session, toEmail, amount))
    }
}
