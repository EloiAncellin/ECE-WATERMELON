import {users, cards, wallets, transferList} from './MockObjects.js'
import {Transfer} from './TransferModel.js'
import {Cash} from './CashModel.js'

export class ApiSimulation{
    static wait(ms){
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
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
        for(user of users){
            if(user.email == email && user.password == password){
                return ApiSimulation.success(user)
            }
        }
        return ApiSimulation.failure("user not found, or wrong password")
    }

    static getWallet(session){
        ApiSimulation.wait(1500)
        for(wallet of wallets){
            if(wallet.userId == session.userId){
                return ApiSimulation.success(wallet)
            }
        }
        return ApiSimulation.failure("user has no wallet")
    }

    static transfer(session, toEmail, amount){
        ApiSimulation.wait(2500)
        user = null
        for(usr of users){
            if(usr.email == toEmail){
                user = usr
                break
            }
        }
        if(user == null){
            return ApiSimulation.failure("could not found user")
        }

        transfer = new Transfer(transferList.length, user.id, new Cash(amount))
        transferList.push(transfer)
        session.transferList.push(transfer)
        return ApiSimulation.success(transfer)
    }
}
