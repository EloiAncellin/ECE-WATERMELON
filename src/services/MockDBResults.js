var payInList = [
    {
        id: 1,
        fromName: "My Cool Bank",
        amount: {
            amount_int: 15,
            amount_dec: 0
        }
    },
    {
        id: 2,
        fromName: "My Super Bank",
        amount: {
            amount_int: 150,
            amount_dec: 64
        }
    },
    {
        id: 3,
        fromName: "My Super Bank",
        amount: {
            amount_int: 47,
            amount_dec: 0
        }
    }
]

var payOutList = [
    {
        id: 1,
        toName: "My Cool Bank",
        amount: {
            amount_int: 7,
            amount_dec: 64
        }
    },
    {
        id: 2,
        toName: "My super Bank",
        amount: {
            amount_int: 47,
            amount_dec: 1
        }
    }
]

var transfers = [
    {
        id: 1,
        toUserId: 1,
        amount: {
            amount_int: 5,
            amount_dec: 3
        }
    },
    {
        id: 2,
        toUserId: 2,
        amount: {
            amount_int: 31,
            amount_dec: 0
        }
    }
]

var cards = [
    {
        id: 1,
        expiresAt: "01-01-2020",
        lastFour: "4444",
        cardNumber: "1111222233334444",
        cardName: "Card1",
        brand: "Mastercard",
        currency: "EUR",
        payInList: [payInList[0]],
        payOutList: [payOutList[0]],
        transfers: [transfers[0]],
    },
    {
        id: 1,
        expiresAt: "01-01-2020",
        lastFour: "4444",
        cardNumber: "1111222233334444",
        cardName: "Card1",
        brand: "Mastercard",
        currency: "EUR",
        payInList: [payInList[0]],
        payOutList: [payOutList[0]],
        transfers: [transfers[0]],
    },
    {
        id: 2,
        expiresAt: "01-01-2020",
        lastFour: "5555",
        cardNumber: "2222333344445555",
        cardName: "Card2",
        brand: "Mastercard",
        currency: "USD",
        payInList: [payInList[1], payInList[2]],
        payOutList: [payOutList[1]],
        transfers: [transfers[1]],
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
        transfers: [],
    }
]

var wallets = [
    {
        id: 1,
        cards: [cards[0], cards[1]],
    },
    {
        id: 2,
        cards: [cards[2]],
    }
]

var users = [
    {
        id: 1,
        email: "toto1@ece.fr",
        firstName: "Toto1",
        lastName:"Tata1",
        password: "toto1",
        wallet: wallets[0]
    },
    {
        id: 2,
        email: "toto2@ece.fr",
        firstName: "Toto2",
        lastName:"Tata2",
        password: "toto2",
        wallet: wallets[1]
    }
]

export const mock = {
    payInList: payInList,
    payOutList: payOutList,
    transfers: transfers,
    cards: cards,
    wallets: wallets,
    users: users
}
