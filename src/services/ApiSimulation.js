import {users, cards, wallets} from './MockObjects.js'

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

    static getWallet(userId){
        ApiSimulation.wait(1500)
        for(wallet of wallets){
            if(wallet.userId == userId){
                return ApiSimulation.success(wallet)
            }
        }
        return ApiSimulation.failure("user has no wallet")
    }

    static
}
