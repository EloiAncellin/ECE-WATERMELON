import {mock} from './MockDBResults.js'
import {Card} from '../models/CardModel.js'
import {Cash} from '../models/CashModel.js'
import {PayIn} from '../models/PayInModel.js'
import {PayOut} from '../models/PayOutModel.js'
import {Transfer} from '../models/TransferModel.js'
import {User} from '../models/UserModel.js'
import {Wallet} from '../models/WalletModel.js'

export var payInList = mock.payInList.map((json) =>
    new PayIn(json.id, json.fromName, new Cash(json.amount.amount_int, json.amount.amount_dec))
)

export var payOutList = mock.payOutList.map((json) =>
    new PayOut(json.id, json.toName, new Cash(json.amount.amount_int, json.amount.amount_dec))
)

export var transfers = mock.transfers.map((json) =>
    new Transfer(json.id, json.toUserId, new Cash(json.amount.amount_int, json.amount.amount_dec))
)

export var cards = mock.cards.map((json) => new Card(json))

export var wallets = mock.transfers.map((json) => new Wallet(json.id, json.cards))

export var users = mock.users.map((json) => new User(json))
