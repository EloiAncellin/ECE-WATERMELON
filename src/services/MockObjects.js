import {Cash} from './CashModel.js'

export const users = [
    {
        id: 1,
        email: "toto1@ece.fr",
        firstName: "Toto1",
        lastName: "Tata1",
        password: "toto1",
    },
    {
        id: 2,
        email: "toto2@ece.fr",
        firstName: "Toto2",
        lastName: "Tata2",
        password: "toto2",
    }
]

export const payInList = [
    {
        id: 1,
        fromName: "My Cool Bank",
        amount: new Cash(),
    }
]

export const cards = [
    {
        id: 1,
        expiresAt: "01-01-2020",
        lastFour: "4444",
        cardNumber: "1111222233334444",
        cardName: "Card1",
        brand: "Mastercard",
        currency: "EUR",
        payInList: [],
        payOutList: [],
        transferList: [],
    },
    {
        id: 2,
        expiresAt: "01-01-2020",
        lastFour: "5555",
        cardNumber: "2222333344445555",
        cardName: "Card2",
        brand: "Mastercard",
        currency: "USD",
        payInList: [],
        payOutList: [],
        transferList: [],
    },
    {
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
    }
]

export const wallets = [
    {
        id: 1,
        userId: 1,
        cardList: [cards[0], cards[1]],
    },
    {
        id: 2,
        userId: 2,
        cardList: [cards[2]],
    }
]
