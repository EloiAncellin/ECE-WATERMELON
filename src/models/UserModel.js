export class User{
    id;
    email;
    firstName;
    lastName;
    password;

    constructor(id, email, firstName, lastName, password){
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
    }
}
