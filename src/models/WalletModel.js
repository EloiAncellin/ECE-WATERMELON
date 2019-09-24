export class Wallet{
    id;
    userId;
    cardList;

    constructor(id, userId, cardList){
        this.id = id
        this.userId = userId
        this.cardList = cardList
    }
}
