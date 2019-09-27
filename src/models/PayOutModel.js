export class PayOut{
    id;
    toName;
    amount;

    constructor(id, toName, amount){
        this.id = id
        this.toName = toName
        this.amount = amount
    }
}
