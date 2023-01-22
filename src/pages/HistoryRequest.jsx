import React from "react";

import Header from "../module/components/Header";
import SeachBox from "../module/components/SeachBox";
import Navegation from "../module/components/Navegation";

import clockIcon from "../images/icon/clockIcon.svg";           
import "../style/min/HistoryRequest.scss";

function HistoryRequest(props){
    return (
        <>
            <Header type={0} page="Pedidos"/>

            <main>
                <SeachBox/>

                <div className="container-nav">

                    <div className="container-pending">
                        <span className="text-subTextrequest">Pendente</span>
                        <div className="container-content-request">
                            <div className="box-informationRequest">
                                <span className="text-date-request">20/02/2023</span>
                                <div className="box-informationCard">
                                    <img src="" alt="Card" />
                                    <span className="text-numberCard">*1293</span>
                                </div>
                            </div>

                            <div className="box-othersInformationRequest">
                                <div className="box-valuesRequest">
                                    <span className="text-valueNumberRequest">R$ 90,00</span>
                                    <span className="text-valuePartRequest">12x de 7,50</span>
                                </div>
                                <div className="content-tableSelect">D12</div>
                            </div>

                            <div className="container-interactiveUser">
                                <button className="button-preparing">Preparar Pedido</button>
                                <div className="box-finishTimeRequest">
                                    <div className="box-showInformation style-clock">
                                        <img src={clockIcon} alt="Time" />
                                        <span className="text-information">20 min</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container-history">
                        <span className="text-subTextrequest">Histórico</span>
                        
                        <div className="container-content-request">
                            <div className="box-informationRequest">
                                <span className="text-date-request">20/02/2023</span>
                                <div className="box-informationCard">
                                    <img src="" alt="Card" />
                                    <span className="text-numberCard">*1293</span>
                                </div>
                            </div>

                            <div className="box-othersInformationRequest">
                                <div className="box-valuesRequest">
                                    <span className="text-valueNumberRequest">R$ 90,00</span>
                                    <span className="text-valuePartRequest">12x de 7,50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            
            <Navegation/>
        </>
    )
}

export default HistoryRequest