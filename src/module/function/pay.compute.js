class payment{
    constructor(card, Payment, configTables, value, splitTime){
        this.card = card;
        this.payment = Payment;
        this.tableConfig = configTables;
        this.value = value;
        this.splitTime = splitTime;
    }

    init(){
        // TODO criar request para o banco e realizar o pagamento
        if(this.payment === 2){
            // pix
        }else if(this.payment === 3){
            // cartão fidelidade
        }else{
            console.log(this.card)
        }
    }
}

export default payment