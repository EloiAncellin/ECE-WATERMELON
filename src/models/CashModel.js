export class Cash{
    amount_int = 0;
    amount_dec = 0;

    isValid(){
        if(this.amount_dec >= 0 && this.amount_dec < 100){
            // make sure this.amount_dec is always two digits
            if(this.amount_dec < 10){
                this.amount_dec *= 10
            }
            // make sure amount_int is an int
            if(this.amount_int == Math.floor(this.amount_int)){
                return true
            }
        }
        return false
    }

    asFloat(){
        if(this.isValid()){
            return this.amount_int + (this.amount_dec / 100)
        }
        return null
    }

    add(cash){
        if(this.isValid()){
            if(cash instanceof Cash){
                new_cash = new Cash()
                new_cash.amount_int = this.amount_int + cash.amount_int
                new_cash.amount_dec = this.amount_dec + cash.amount_dec
                if(new_cash.amount_dec >= 100){
                    new_cash.amount_int += 1
                    new_cash.amount_dec -= 100
                }
                return cash
            }
        }
        return null
    }

    sub(cash){
        if(this.isValid()){
            if(cash instanceof Cash){
                new_cash = new Cash()
                new_cash.amount_int = this.amount_int - cash.amount_int
                new_cash.amount_dec = this.amount_dec - cash.amount_dec
                return cash
            }
        }
        return null
    }
}
