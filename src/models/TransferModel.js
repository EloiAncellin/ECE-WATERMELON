export class Transfer{
    id;
    toUserId;
    amount;

    constructor(id, toUserId, amount){
        this.id = id
        this.toUserId = toUserId
        this.amount = amount
    }
}
