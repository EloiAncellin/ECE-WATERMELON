import "./apiService.js";
import {success, failure} from "./api/mock/server";


// Get functions
export function getUserFromStorage(){
    let user;
    try{
        user = JSON.parse(localStorage.getItem('user'));
        if(user === null){
            return failure(null);
        }
    }catch(e){
        console.log('user failure');
        return failure(null);
    }

    return  success(JSON.parse(localStorage.getItem('user')));
}

export function getWalletFromStorage(){
    let wallet;
    try{
        wallet = JSON.parse(localStorage.getItem('wallet'));
        if(wallet.id){
            return success(wallet);
        }
    }catch(e){
        console.log('wallet failure');
        return failure(null);
    }

    return  success(JSON.parse(localStorage.getItem('wallet')));
}


// save functions
export function saveUserToStorage(user){
        if(user === null || user === undefined){
            return failure(user);
        }else{
            localStorage.setItem('user', JSON.stringify(user));
        }

    return success(user);
}

export function saveWalletToStorage(wallet){
        if(wallet === null || wallet === undefined){
            return failure(wallet);
        }else{
            localStorage.setItem('wallet', JSON.stringify(wallet));
        }

    return success(wallet);
}


export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}
