import React from "react";
// component
import Navegation from "../module/components/Navegation";
import Header from "../module/components/Header";
// images
import clockIcon from "../images/icon/clockIcon.svg";           
import starIcon from  "../images/icon/starIcon.svg";     
import attentionIcon from "../images/icon/attentionIcon.svg";  

import "../style/min/ShowProduct.scss";

function ShowProduct(props){
    return (
        <>  
            <Header type={2}/>

            <main id="content-show-product">
                <div className="backgroundApresentation"><img src="" alt="" /></div>
                <div className="container-informationShowProduct">
                    <div className="box-content-information">
                        <h1 className="text-nameProduct">Name Prato</h1>
                        <div className="box-othersInformation">
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
                        </div>
                    </div>
                    <span className="text-ValueProduct">R$ 45,00</span>
                </div>

                <p className="text-descriptionProduct">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dui nunc, condimentum ac augue id, elementum blandit nulla. Nunc egestas ac mi quis lacinia. Nulla nec fermentum turpis. Etiam non augue libero. Curabitur ligula dolor, feugiat in aliquet sed, auctor nec ligula. Mauris at facilisis odio. Interdum et malesuada fames ac ante ipsum primim</p>

                <div className="container-touch">
                    <div className="content-interation">
                        <button className="button-observation"><img src={attentionIcon} alt="OBS" /></button>
                        <button className="button-addList">Adicionar na lista de pedido</button>
                    </div>
                    <textarea className="text-observation" placeholder="Escreva um observação para seu pedido"></textarea>
                </div>

                <div className="container-SeenRecently">
                    <span className="text-SeenRecently">Visto Recentemente</span>
                    <div className="content-carrosel-product">
                        <div className="box-minifyProduct"><img src="" alt="" /></div>
                    </div>
                </div>


            
            </main>

            <Navegation/>
        </>
    )
}

export default ShowProduct