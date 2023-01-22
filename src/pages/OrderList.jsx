import React from "react";
import {useNavigate} from "react-router-dom"

import Header from "../module/components/Header";
import SeachBox from "../module/components/SeachBox";
import Navegation from "../module/components/Navegation";

import clockIcon from "../images/icon/clockIcon.svg";           
import starIcon from  "../images/icon/starIcon.svg";           
import "../style/min/orderList.scss";
import "../style/min/index.scss";

function removeProduct(){
    // TODO criar em classe separada
}

function OrderList(props){
    const navigate = useNavigate();
    function requestPay(){
        // TODO gerar token e request pay
        navigate("/pay")
    }


    return (
        <>
            <Header type={0} page="Lista de Pedido"/>

            <main>
                <SeachBox/>

                <div className="content-Product style-orderList">
                    <div className="box-Products">

                        {[1, 2].map(position => (
                            <div className="showProduct" key={position}>
                                
                                <div className="imgContent style-removeProduct" onClick={(e) => removeProduct()}><img src="" alt="Product" /></div> 
                                
                                <div className="Informations-Product">
                                    <span className="text-NameProduct">Name place</span>
                                    <div className="box-information">
                                        <div className="box-showInformation style-clock">
                                            <img src={clockIcon} alt="Time" />
                                            <span className="text-information">20 min</span>
                                        </div>
                                        <div className="box-showInformation style-appraisal">
                                            <img src={starIcon} alt="Avalização" />
                                            <span className="text-information">4.6</span>
                                        </div>
                                    </div>
                                    <span className="text-value">R$ 45,00</span>
                                </div>
                            </div>
                        ))}

                    </div>

                    <button className="button-removeAll">Remover Tudo</button>
                </div>

                <div className="container-content-value">
                    <div className="box-value">
                        <span className="text-valueTxt">Total: </span>
                        <span className="text-valueNum">R$ 90,00</span>
                    </div>

                    <button onClick={(e) => requestPay()} className="button-finishPurchase">Ir para Pagamento</button>
                </div>
            </main>
            
            <Navegation/>
        </>
    )
}

export default OrderList