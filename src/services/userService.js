import "./apiService.js"
import {authenticate} from "./api/mock/server";

export function getUserFromStorage(){
        let result = JSON.parse(localStorage.getItem('user'));
        return result.result;
}

export function saveUserToStorage(){
        let user =  authenticate('toto1@ece.fr', 'toto1');
        localStorage.setItem('user', user);
        return true;
}

export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}

