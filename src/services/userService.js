import "./apiService.js"
import {authenticate} from "./api/mock/server";

export function getUserFromStorage(){
        return  localStorage.getItem('user');
}

export function saveUserToStorage(user){
        //let user =  authenticate('toto1@ece.fr', 'toto1');
        localStorage.setItem('user', user);
        return true;
}

export function disconnect(props){
        localStorage.clear();
        props.history.push('/login');
}

