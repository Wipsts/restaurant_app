/* eslint-disable no-unreachable */
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import Header from "../module/components/Header";
import MenuChoose from "../module/components/MenuChoose";
import ResponsePayment from "../module/components/ResponsePayment";
import {payCompute, userLog} from "../module/main"

import cardIcon from "../images/icon/cardIcon.svg"
import virtualCardIcon from "../images/icon/virtualCardIcon.svg"
import pixIcon from "../images/icon/pixIcon.svg"
import loyaltyCardIcon from "../images/icon/loyaltyCardIcon.svg"
import clockIcon from "../images/icon/clockIcon.svg";           
import distIcon from "../images/icon/distIcon.svg";           

import "../style/min/Pay.scss";

// example card bd 
import exampleCardJson from "../server/example/example.card.json"

function Pay(props){
    const [modeMenuChoose, setModeMenuChoose] =  useState("style-CloseMenu");
    const [configTables, setConfigTables] = useState({configTable_table: {idTable: '---', tableSelect: '0'}, configTable_user:[0, 0]})
    const [selectPayment, setSelectPayment] = useState([1,0,0,0])
    const [cardSelect, setCardSelect] = useState({})
    const [splitTime, setSplitTime] = useState(1)
    const [configPay, setConfigPay] = useState({value: 0, timePreparing: 0, timeMove: 0})

    // example card bd 
    const [cards, setCards] = useState([])

    function closeOpenMenu(){
        setModeMenuChoose((modeMenuChoose === "style-OpenMenu" ? "style-CloseMenu" : "style-OpenMenu"))
    }

    function selectThisPayment(s){
        const configPayment = [0,0,0,0]
        configPayment[s] = 1
        setSelectPayment(configPayment)
    }

    function createPay(){
        const payment = whatPaymentSelect()

        if(informationExist()){
            new payCompute(cardSelect, payment, configTables, configPay.value, splitTime).init()
        }else{
            alert("No information")
        }

        function informationExist(){
            if(configPay.value && splitTime && selectPayment.includes(1) && configTables.configTable_table.tableSelect !== "0")
                return true
            else
                return false
        }

        function whatPaymentSelect(){
            switch(selectPayment){
                case selectPayment[0]:
                    return 0
                break;
                case selectPayment[1]:
                    return 1
                break;
                case selectPayment[2]:
                    return 2
                break;
                default:
                    return 3
                break;
            }
        }
    }
    
    const configTablesRequest = r => {
        setConfigTables(r)
    }

    const cardSelectRequest = r => {
        setCardSelect(r)
    }

    const splitTimeRequest = r => {
        setSplitTime(r)
    }

    useEffect(() => {
        // example card bd 
        setCards(exampleCardJson)
        setConfigPay({value: 90, timePreparing: 20, timeMove: 10})
    }, []);

    return (
        <>
            <Header type={1} page="Pagamento"/>
            <MenuChoose configTablesRequest={configTablesRequest} CloseMenuOnclickButton={(e) => closeOpenMenu()} mode={modeMenuChoose}/>

            <main id="main-pay">
                {(new userLog().init()) ? (
                    <>
                        <div className="container-warning">
                            <span className="text-warning"><b>Atenção</b> esses pedidos são de <u> consumo no restaurante</u>, isto é uma comodidade feita para minimizar o tempo de espera da comida e da mesa</span>
                        </div>
        
                        <div className="container-selectTable">
                            <div className="box-tableSelect">{configTables.configTable_table.idTable}</div>
                            <button className="button-selectTable" onClick={(e) => closeOpenMenu()}>Escolher Mesa</button> 
                            {/* or Alterar Mesa */}
                        </div>
        
                        <div className="container-paymentMethod">
                            <span className="text-SubTextInformation style-paymentMethod">Opções de pagamento</span>                    
        
                            <div className="content-payment">
                                <button className={`button-payment ${selectPayment[0] ? "style-selectPayment" : ""}`} onClick={(e) => selectThisPayment(0)} title="Cartão de crédito"><img src={cardIcon} alt="card" /></button>
                                <button className={`button-payment ${selectPayment[1] ? "style-selectPayment" : ""}`} onClick={(e) => selectThisPayment(1)} title="Cartão de virtual"><img src={virtualCardIcon} alt="virtualCard" /></button>
                                <button className={`button-payment ${selectPayment[2] ? "style-selectPayment" : ""}`} onClick={(e) => selectThisPayment(2)} title="PIX"><img src={pixIcon} alt="pix" /></button>
                                <button className={`button-payment ${selectPayment[3] ? "style-selectPayment" : ""}`} onClick={(e) => selectThisPayment(3)} title="Cartão Fidelidade"><img src={loyaltyCardIcon} alt="loyaltyCard" /></button>
                            </div>
        
                            <ResponsePayment splitTime={splitTimeRequest} cardSelect={cardSelectRequest} cards={cards} layout={selectPayment} />                    
                        </div>
        
                        <div className="container-contentValuePayment">
                            <div className="box-value">
                                <span className="text-valueTxt">Total: </span>
                                <div className="box-valuePayment">
                                    <span className="text-valueNum">R$ {configPay.value.toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                    <span className="text-valueSplitTime">{splitTime}x de {(configPay.value / parseInt(splitTime)).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                </div>
                            </div>
                        </div>
        
                        <div className="container-informationRequestPayment">
                            <div className="box-content-informationPayment">
                                <div className="box-showInformation style-clock">
                                    <img src={clockIcon} alt="Time" />
                                    <span className="text-information">{configPay.timePreparing} min</span>
                                </div>
                            </div>
                            <div className="box-content-informationPayment">
                                <div className="box-showInformation style-dist">
                                    <img src={distIcon} alt="Time" />
                                    <span className="text-information">{configPay.timeMove} min</span>
                                </div>
                            </div>
                        </div>
        
                        <button onClick={(e) => createPay()} className="button-finishPurchase">Finalizar</button>
                    </>
                ) : (
                    <div className="container-logInMove">
                        <span className="text-WarningLogin">Login</span>
                        <span className="text-subWarningLogin">Faça login para adicionar produtos a sua lista e personalizar sua conta do seu jeito</span>
                        <Link to="/login"><button className="button-warningLogin">Fazer Login</button></Link>
                    </div>
                )}


            </main>
        </>
    )
}

export default Pay