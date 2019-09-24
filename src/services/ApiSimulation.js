import {users, cards, wallets} from './MockObjects.js'

export class ApiSimulation{
    function wait(ms){
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }

    function success(result){
        return JSON.stringify({
            status: "success",
            result: result
        })
    }

    function failure(error){
        return JSON.stringify({
            status: "failure",
            error: error
        })
    }

    static authenticateUser(email, password){
        wait(1000)
        for(user of users){
            if(user.email == email && user.password == password){
                return success(user)
            }
        }
        return failure("user not found, or wrong password")
    }

    static getWallet(userId){
        wait(1500)
        for(wallet of wallets){
            if(wallet.userId == userId){
                return success(wallet)
            }
        }
        return failure("user has no wallet")
    }
}
