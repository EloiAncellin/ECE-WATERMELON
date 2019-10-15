import "./apiService.js"
import {authenticate} from "./api/mock/server";
import './storageService';

export function saveUserToStorage(user){
        //let user =  authenticate('toto1@ece.fr', 'toto1');
        localStorage.setItem('user', user);
        return true;
}

export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}

function getWallet(){
        const wallet = getWalletFromStrage();
        if(wallet.status === "success"){
                return success(wallet.result);
        }else{
                const user = getUserFromStorage();
                if(user.status==="success"){
                        let userwallet = getWallet(user.result.id);
                        if(userwallet.status==="success"){
                                return success(userwallet.result);
                        }else{
                                return {
                                        id: maxId
                                }
                        }

                }
        }
}

