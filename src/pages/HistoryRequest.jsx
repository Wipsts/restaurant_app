import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {getHistoric, userLog} from "../module/main"

import Header from "../module/components/Header";
import SeachBox from "../module/components/SeachBox";
import Navegation from "../module/components/Navegation";

import clockIcon from "../images/icon/clockIcon.svg";           
import "../style/min/HistoryRequest.scss";

function HistoryRequest(props){
    const [historic, setHistoric] = useState([])
    const [pending, setPending] = useState()
    const [userIsLog, setUserIsLog] = useState(false)

    function getInformationHistoric(){
        new getHistoric().get(Response => {
            setHistoric(Response.historic)
            setPending(Response.pending)
        })
        new userLog().init(Response => {
            setUserIsLog(Response)
        })
    }

    useEffect(() => {
        getInformationHistoric();
    }, [])

    return (
        <>
            <Header type={0} page="Pedidos"/>

            <main>
                <SeachBox/>
                {(userIsLog) ? (
                    <>
                        <div className="container-nav">
                            <div className="container-pending">
                                <span className="text-subTextrequest">Pendente</span>
                                {(pending && pending[0]) ? (
                                    <div className="container-content-request">
                                        <div className="box-informationRequest">
                                            <span className="text-date-request">{pending.date}</span>
                                            <div className="box-informationCard">
                                                <img src="" alt="Card" />
                                                <span className="text-numberCard">{pending.cardValue.secretNumber}</span>
                                            </div>
                                        </div>
                                        <div className="box-othersInformationRequest">
                                            <div className="box-valuesRequest">
                                                <span className="text-valueNumberRequest">R$ {parseFloat(pending.val).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                                <span className="text-valuePartRequest">{pending.amountInInstallments}x de {parseFloat(( parseInt(pending.val) / pending.amountInInstallments)).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                            </div>
                                            <div className="content-tableSelect">{pending.table}</div>
                                        </div>
                                        <div className="container-interactiveUser">
                                            <button className="button-preparing">Preparar Pedido</button>
                                            <div className="box-finishTimeRequest">
                                                <div className="box-showInformation style-clock">
                                                    <img src={clockIcon} alt="Time" />
                                                    <span className="text-information">{pending.time} min</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ): ""}
                            </div>

                            <div className="container-history">
                                <span className="text-subTextrequest">Histórico</span>
                                
                                {historic ? historic.map((hist, position) => (
                                    <div key={hist.id} className="container-content-request">
                                        <div className="box-informationRequest">
                                            <span className="text-date-request">{hist.date}</span>
                                            <div className="box-informationCard">
                                                <img src="" alt="Card" />
                                                <span className="text-numberCard">{hist.cardUsed.secretNumber}</span>
                                            </div>
                                        </div>

                                        <div className="box-othersInformationRequest">
                                            <div className="box-valuesRequest">
                                                <span className="text-valueNumberRequest">R$ {parseFloat(hist.val).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                                <span className="text-valuePartRequest">{hist.amountInInstallments}x de {parseFloat(( parseInt(hist.val) / hist.amountInInstallments)).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : ""}
                            </div>
                        </div>
                    </>
                ):(
                    <div className="container-logInMove">
                        <span className="text-WarningLogin">Login</span>
                        <span className="text-subWarningLogin">Faça login para adicionar produtos a sua lista e personalizar sua conta do seu jeito</span>
                        <Link to="/login"><button className="button-warningLogin">Fazer Login</button></Link>
                    </div>
                )}


            </main>
            
            <Navegation/>
        </>
    )
}

export default HistoryRequest