import "./apiService.js"
import {authenticate, getUserWallet, success} from "./api/mock/server";
import './storageService';
import {getUserFromStorage, getWalletFromStorage} from "./storageService";
import {createWallet} from "./createData";

export function saveUserToStorage(user){
        //let user =  authenticate('toto1@ece.fr', 'toto1');
        localStorage.setItem('user', user);
        return true;
}

export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}

export function getWallet(){
        const wallet = getWalletFromStorage();
        if(wallet.status === "success"){
                return success(wallet.result);
        }else{
                const user = getUserFromStorage();
                if(user.status==="success"){
                        let userwallet = getUserWallet(user.result.id);
                        if(userwallet.status==="success"){
                                return success(userwallet.result);
                        }else{
                                return success(createWallet(user));
                        }

                }
        }
}



