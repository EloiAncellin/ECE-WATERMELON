import {Card} from './CardModel.js'
import {Cash} from './CashModel.js'
import {PayIn} from './PayInModel.js'
import {PayOut} from './PayOutModel.js'
import {Transfer} from './TransferModel.js'
import {User} from './UserModel.js'
import {Wallet} from './WalletModel.js'

export const users = [
    new User(1, "toto1@ece.fr", "Toto1", "Tata1", "toto1"),
    new User(2, "toto2@ece.fr", "Toto2", "Tata2", "toto2"),
]

export const payInList = [
    new PayIn(1, "My Cool Bank", new Cash(15)),
    new PayIn(2, "My Super Bank", new Cash(150, 64)),
    new PayIn(3, "My Super Bank", new Cash(47))
]

export const payOutList = [
    new PayOut(1, "My Cool Bank", new Cash(7, 64)),
    new PayOut(2, "My Super Bank", new Cash(97, 06))
]

export const transferList = [
    new Transfer(1, 1, new Cash(5, 3)),
    new Transfer(2, 2, new Cash(31))
]

export const cards = [
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

export const wallets = [
    new Wallet(1, 1, [cards[0], cards[1]]),
    new Wallet(1, 2, [cards[2]])
]
