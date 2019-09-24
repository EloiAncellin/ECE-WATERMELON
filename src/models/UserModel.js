export class User{
    id;
    email;
    firstName;
    lastName;
    password;
    wallet;

    constructor(json){
        this.id = json.id
        this.email = json.email
        this.firstName = json.firstName
        this.lastName = json.lastName
        this.password = json.password
        this.wallet = json.wallet
    }
}
