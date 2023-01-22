import React from "react";

import Header from "../module/components/Header";
import SeachBox from "../module/components/SeachBox";
import Navegation from "../module/components/Navegation";

import clockIcon from "../images/icon/clockIcon.svg";           
import starIcon from  "../images/icon/starIcon.svg";           
import "../style/min/index.scss";
import { Link } from "react-router-dom";

function Index(props){
    return (
        <>
            <Header type={0} page="Menu"/>

            <main>
                <SeachBox/>

                <div className="content-Product">
                    <nav className="listFilter">
                        <span className="text-Filters text-filterSelect">Todos</span>
                        <span className="text-Filters">Pizzas</span>
                        <span className="text-Filters">Petisco</span>
                        <span className="text-Filters">Acompanhamentos</span>
                        <span className="text-Filters">Acompanhamentos</span>
                        <span className="text-Filters">Acompanhamentos</span>
                    </nav>

                    <div className="box-Products">

                        {[1, 2, 3, 4, 5, 6].map(position => (
                            <Link to="/show?" key={position}>
                                <div className="showProduct" >
                                    <div className="imgContent"><img src="" alt="Product" /></div>
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
                            </Link>
                        ))}

                    </div>
                </div>

            </main>
            
            <Navegation/>
        </>
    )
}

export default Index