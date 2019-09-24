import {Card} from '../models/CardModel.js'
import {Cash} from '../models/CashModel.js'
import {PayIn} from '../models/PayInModel.js'
import {PayOut} from '../models/PayOutModel.js'
import {Transfer} from '../models/TransferModel.js'
import {User} from '../models/UserModel.js'
import {Wallet} from '../models/WalletModel.js'

export var payInList = [
    new PayIn(1, "My Cool Bank", new Cash(15)),
    new PayIn(2, "My Super Bank", new Cash(150, 64)),
    new PayIn(3, "My Super Bank", new Cash(47))
]

export var payOutList = [
    new PayOut(1, "My Cool Bank", new Cash(7, 64)),
    new PayOut(2, "My Super Bank", new Cash(47, 1))
]

export var transferList = [
    new Transfer(1, 1, new Cash(5, 3)),
    new Transfer(2, 2, new Cash(31))
]

export var cards = [
    new Card({
        id: 1,
        expiresAt: "01-01-2020",
        lastFour: "4444",
        cardNumber: "1111222233334444",
        cardName: "Card1",
        brand: "Mastercard",
        currency: "EUR",
        payInList: [payInList[0]],
        payOutList: [payOutList[0]],
        transferList: [transferList[0]],
    }),
    new Card({
        id: 1,
        expiresAt: "01-01-2020",
        lastFour: "4444",
        cardNumber: "1111222233334444",
        cardName: "Card1",
        brand: "Mastercard",
        currency: "EUR",
        payInList: [payInList[0]],
        payOutList: [payOutList[0]],
        transferList: [transferList[0]],
    }),
    new Card({
        id: 2,
        expiresAt: "01-01-2020",
        lastFour: "5555",
        cardNumber: "2222333344445555",
        cardName: "Card2",
        brand: "Mastercard",
        currency: "USD",
        payInList: [payInList[1], payInList[2]],
        payOutList: [payOutList[1]],
        transferList: [transferList[1]],
    }),
    new Card({
        id: 3,
        expiresAt: "01-01-2020",
        lastFour: "6666",
        cardNumber: "3333444455556666",
        cardName: "Card3",
        brand: "Mastercard",
        currency: "EUR",
        payInList: [],
        payOutList: [],
        transferList: [],
    })
]

export var wallets = [
    new Wallet(1, [cards[0], cards[1]]),
    new Wallet(1, [cards[2]])
]

export var users = [
    new User({
        id: 1,
        email: "toto1@ece.fr",
        firstName: "Toto1",
        lastName:"Tata1",
        password: "toto1",
        wallet: wallets[0]
    }),
    new User({
        id: 2,
        email: "toto2@ece.fr",
        firstName: "Toto2",
        lastName:"Tata2",
        password: "toto2",
        wallet: wallets[1]
    })
]
