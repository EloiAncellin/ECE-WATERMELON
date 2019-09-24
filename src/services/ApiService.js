import {ApiSimulation} from './ApiSimulation.js'

export class ApiService{
    authenticateUser(email, password){
        return ApiSimulation.authenticateUser(email, password)
    }

    getWallet(session){
        return ApiSimulation.getWallet(session)
    }

    transfer(session, toEmail, amount){
        return ApiSimulation.transfer(session, toEmail, amount)
    }
}
