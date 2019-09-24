import {users, transferList} from './MockObjects.js'
import {Transfer} from '../models/TransferModel.js'
import {Cash} from '../models/CashModel.js'

export class ApiSimulation{
    static wait(ms){
        // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }

    static success(result){
        return JSON.stringify({
            status: "success",
            result: result
        })
    }

    static failure(error){
        return JSON.stringify({
            status: "failure",
            error: error
        })
    }

    static authenticateUser(email, password){
        ApiSimulation.wait(1000)
        for(var user of users){
            if(user.email === email && user.password === password){
                return ApiSimulation.success(user)
            }
        }
        return ApiSimulation.failure("user not found, or wrong password")
    }

    static transfer(session, toEmail, amount){
        ApiSimulation.wait(2500)
        var user = null
        for(var usr of users){
            if(usr.email === toEmail){
                user = usr
                break
            }
        }
        if(user == null){
            return ApiSimulation.failure("could not found user")
        }

        var transfer = new Transfer(transferList.length, user.id, new Cash(amount))
        transferList.push(transfer)
        session.transferList.push(transfer)
        return ApiSimulation.success(transfer)
    }
}
