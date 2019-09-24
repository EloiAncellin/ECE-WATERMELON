export class Card{
    id;
    expiresAt;
    lastFour;
    cardNumber;
    cardName;
    brand;
    currency;
    payInList;
    payOutList;
    transferList;

    constructor(json){
        this.id = json.id
        this.expiresAt = json.expiresAt
        this.lastFour = json.lastFour
        this.cardNumber = json.cardNumber
        this.cardName = json.cardName
        this.brand = json.brand
        this.currency = json.currency
        this.payInList = json.payInList
        this.payOutList = json.payOutList
        this.transferList = json.transferList
    }
}
