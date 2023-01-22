/* eslint-disable no-useless-constructor */
import React, {Component} from "react";
import qrCodePix from "../../images/img/QrCodePix.svg";
import "../../style/module/ResponsePayment.scss"

class ResponsePayment extends Component {
    constructor(props){
        super(props)
        this.state = {
            cardSelect: [],
            virtualCardSelect: [],
            card: [],
            splitTime: "1x"
        }
    }

    componentDidMount() {
        const createCardSelect = () => {
            var CountCard = this.props.cards.map((c, i) => {
                if(c.type === "credit"){
                    return 0
                }else{
                    return undefined
                }
            })
            var CountUpdateCard = this.props.cards.map((c, i) => {
                if(c.type === "virtualCard"){
                    return 0
                }else{
                    return undefined
                }
            })



            this.setState({card: this.props.cards, cardSelect: CountCard.filter(e => e != null), virtualCardSelect: CountUpdateCard.filter(e => e != null)});
       }
       createCardSelect()
    }
    
    componentDidUpdate(prevState, prevProps) {
        if (this.state.splitTime !== prevState.splitTime) {
            this.props.splitTime(this.state.splitTime.replace("x", ""))
        }
        if(this.props.cards !== prevProps.card){
            this.setState({card: this.props.cards});   
        }
    }

    selectThisCard = (i, type, ic) => {
        var cards
        if(type === "card"){
            cards = this.state.cardSelect
        }else{
            cards = this.state.virtualCardSelect
        }

        const unsetOthersOptions = (cards, type) => {
            var UnsetCards

            if(type === "card"){
                cards = cards.map((c, i) => {document.getElementById(`card_${i}`).checked = false; return 0})
            }else{
                cards = cards.map((c, i) => {document.getElementById(`Virtualcard_${i}`).checked = false; return 0})
            }

            if(type === "card"){
                UnsetCards = this.state.virtualCardSelect
                UnsetCards = UnsetCards.map((c, i) => {return 0})                
                this.setState({virtualCardSelect: UnsetCards})
            }else{
                UnsetCards = this.state.cardSelect
                UnsetCards = UnsetCards.map((c, i) => {return 0})                
                this.setState({cardSelect: UnsetCards})
            }

            return cards
        }

        const selectCardOption = (cards, i, type) =>{
            cards[i] = 1
            if(type === "card"){
                document.getElementById(`card_${i}`).checked = true;
            }else{
                document.getElementById(`Virtualcard_${i}`).checked = true;
            }
            return cards
        }
        
        this.props.cardSelect(this.state.card[ic] ? this.state.card[ic] : false)

        cards = selectCardOption(unsetOthersOptions(cards, type), i, type)

        if(type === "card"){
            this.setState({cardSelect: cards})
        }else{
            this.setState({virtualCardSelect: cards})
        }
    }

    CardType = (props) => {        
        const filterCreditCard = (JsonCard) => {
            return JsonCard.map((c, i) => {
                if(c.type === "credit"){
                    return c
                }else{
                    return undefined
                }
            })
        }
        var card = filterCreditCard(props.card).filter(item => item)

        return (
            <>
                <div className="container-responsePayment">
                    {
                        card.map((c, i) => (
                            <div onClick={(e) => this.selectThisCard(i, "card", i)} key={`cardID-${i}`} className={`container-card ${this.state.cardSelect[i] ? "style-ContainerCardSelect" : ""}`}>
                                <label htmlFor={`card_${i}`}>
                                    <div className="box-informationCardPayment">
                                        <div className="box-card">
                                            <img src="" alt="" />
                                            <span className="text-NameCardInformation">{c.flag}</span>
                                        </div>
                                        <div className="box-cardNumber">
                                            <span className="text-NumberCardInformation">{c.numberShowCard}</span>
                                        </div>
                                    </div>
                                </label>
                                <input type="checkbox" id={`card_${i}`}/>
                                <div className="container-complementCard">
                                    <span className="text-partPayment">Parcelar em: </span>
                                    <div className="box-splitTimes">
                                        <select className="select-splitTime" value={this.state.splitTime} onChange={(e) => this.setState({splitTime: e.target.value})}>
                                            <option value="1x">1x sem juros</option>
                                            <option value="2x">2x sem juros</option>
                                            <option value="3x">3x sem juros</option>
                                            <option value="4x">4x sem juros</option>
                                            <option value="5x">5x sem juros</option>
                                            <option value="6x">6x sem juros</option>
                                            <option value="7x">7x sem juros</option>
                                            <option value="8x">8x sem juros</option>
                                            <option value="9x">9x com juros 0.5%</option>
                                            <option value="10x">10x com juros 0.8%</option>
                                            <option value="11x">11x com juros 1.1%</option>
                                            <option value="12x">12x com juros 1.5%</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                    
            </>
        )
    }

    VirtualCard = (props) => {
        const filterCreditVirtualCard = (JsonCard) => {
            return JsonCard.map((c, i) => {
                if(c.type === "virtualCard")
                    return c
                else
                    return undefined
            })
        }
        var card = filterCreditVirtualCard(props.card).filter(item => item)
        
        return (
            <>
                <div className="container-responsePayment">
                    {
                        card.map((c, i) => (
                            <div onClick={(e) => this.selectThisCard(i, "virtualCard", i + this.state.cardSelect.length)} key={`cardID-${i}`} className={`container-card ${this.state.virtualCardSelect[i] ? "style-ContainerCardSelect" : ""}`}>
                                <label htmlFor={`Virtualcard_${i}`}>
                                    <div className="box-informationCardPayment">
                                        <div className="box-card">
                                            <img src="" alt="" />
                                            <span className="text-NameCardInformation">{c.flag}</span>
                                        </div>
                                        <div className="box-cardNumber">
                                            <span className="text-NumberCardInformation">{c.numberShowCard}</span>
                                        </div>
                                    </div>
                                </label>
                                <input type="checkbox" id={`Virtualcard_${i}`}/>
                                <div className="container-complementCard">
                                    <span className="text-partPayment">Parcelar em: </span>
                                    <div className="box-splitTimes">

                                        <select className="select-splitTime" value={this.state.splitTime} onChange={(e) => this.setState({splitTime: e.target.value})}>
                                            <option value="1x">1x sem juros</option>
                                            <option value="2x">2x sem juros</option>
                                            <option value="3x">3x sem juros</option>
                                            <option value="4x">4x sem juros</option>
                                            <option value="5x">5x sem juros</option>
                                            <option value="6x">6x sem juros</option>
                                            <option value="7x">7x sem juros</option>
                                            <option value="8x">8x sem juros</option>
                                            <option value="9x">9x com juros 0.5%</option>
                                            <option value="10x">10x com juros 0.8%</option>
                                            <option value="11x">11x com juros 1.1%</option>
                                            <option value="12x">12x com juros 1.5%</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                    
            </>
        )
    }

    Pix(){
        const alterCopyMode = mode =>{
            document.getElementById("warning").style.display = (mode ? "flex" : "none")
        }
     
        function copytext(e) {
            navigator.clipboard.writeText(e.target.textContent).then(() => {
                alterCopyMode(true)
            }).catch(err => {
                alterCopyMode(false)
            })
        }

        return (
            <>
                <div className="container-responsePayment">
                    <div className="container-qrcodepix">
                        <img src={qrCodePix} alt="a56c-4928-93be-9b7bfl4beeab" />
                    </div>
                    <div className="content-warning" id="warning">copiado!</div>
                    <button onClick={(e) => copytext(e)} className="text-codepix">a56c-4928-93be-9b7bfl4beeab</button>
                </div>
            </>
        )
    }

    LoyaltyCard({valUser, valLimit}){
        const eligibleMode = () => {
            if(parseFloat(valUser) >= parseFloat(valLimit))
                return "#127973"
            else
                return "#DB6D6D"
        }

        return (
            <>
                <div className="container-responsePayment">
                    <button className="text-codepix"> R$ <b>{valUser}</b>/R$ <i>{valLimit}</i> </button>
                    <button className="text-warningEligible"> <i style={{color: eligibleMode()}}>Não elegivel</i> </button>
                </div>
            </>
        )
    }

    render(){
        const LayoutSelect = (Layout, cards) => {
            if(Layout[0]){
                return <this.CardType card={cards}/>
            }else if(Layout[1]){
                return <this.VirtualCard card={cards}/>
            }else if(Layout[2]){
                return <this.Pix/>
            }else if(Layout[3]){
                return <this.LoyaltyCard valUser={"200,00"} valLimit={"1200,00"}/>
            }
        }

        return (
            <>
                {LayoutSelect(this.props.layout, this.props.cards)}
            </>
        )
    }
}

export default ResponsePayment