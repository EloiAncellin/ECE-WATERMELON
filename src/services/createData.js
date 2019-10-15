import './api/mock/server'
import {getMaxIdUser, getMaxIdWallet} from "./api/mock/server";
import {saveUserToStorage, saveWalletToStorage} from "./storageService";


export function createUser(email, firstName, lastName, password) {
    let maxId = getMaxIdUser();
    maxId++;
    let user = {
        id: maxId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
    };
    saveUserToStorage(user);
    return user;
}

export function createCardList() {
    return {};

}

export function createWallet(user) {
    let maxId = getMaxIdWallet();
    maxId++;
    let wallet= {
		id: maxId,
		user_id: user.id,
		balance: 0
	};
    saveWalletToStorage(wallet);
    return wallet;
}
