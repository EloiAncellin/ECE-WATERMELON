import './api/mock/server'
import {getMaxIdUser, getMaxIdWallet} from "./api/mock/server";
import {getUserFromStorage, saveUserToStorage, saveWalletToStorage} from "./storageService";

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

export function createCards() {
    return [];
}

export function createPayIns() {
    return [];
}

export function createPayOuts() {
    return [];
}

export function createWallet() {
    let maxId = getMaxIdWallet();
    maxId++;
    const user = getUserFromStorage().result;
    let wallet= {
		id: maxId,
		user_id: user.id,
		balance: 0
	};
    saveWalletToStorage(wallet);
    return wallet;
}
