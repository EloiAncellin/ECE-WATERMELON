import {ApiSimulation} from './ApiSimulation.js'

export class ApiService{
    authenticateUser(email, password){
        return ApiSimulation.authenticateUser(email, password)
    }

    transfer(session, toEmail, amount){
        return ApiSimulation.transfer(session, toEmail, amount)
    }
}
