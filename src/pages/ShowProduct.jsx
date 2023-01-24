import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import {QUERY, manageProduct} from "../module/main"
// component
import Navegation from "../module/components/Navegation";
import Header from "../module/components/Header";
// images
import clockIcon from "../images/icon/clockIcon.svg";           
import starIcon from  "../images/icon/starIcon.svg";     
import attentionIcon from "../images/icon/attentionIcon.svg";  

import "../style/min/ShowProduct.scss";

function ShowProduct(){
    const [allProduct, setAllProduct] = useState([])
    const [productSelect, setProductSelect] = useState({data: {images: [], name: "", time: "", appraisal: "", description: "", val: "", tag: ""}, id:""})
    const [searchParams, setSearchParams] = useSearchParams()
    const [buyRequest, setBuyRequest] = useState("")
    const navigate = useNavigate();

    function getProductInDb(){
        const tokenIDProduct = searchParams.get("swn")
        
        if(sessionStorage.getItem('sessionAllProduct')){
            const Product = JSON.parse(sessionStorage.getItem('sessionAllProduct'))
            setAllProduct(Product)
            filterAndShowProductSelect(Product)
        }else{
            getProduct(Product => {
                setAllProduct(Product)
                filterAndShowProductSelect(Product)
                sessionStorage.setItem('sessionAllProduct', JSON.stringify(Product));
            })
        }
        
        function filterAndShowProductSelect(products){
            const productSelect = products.filter(product => product.id === tokenIDProduct)
            setProductSelect(productSelect[0])
        }

        function getProduct(res){
            QUERY('get', {'bd': "product", 'select': ""}, "null", response => {
                res(response)
            })
        }
    }

    function addProductToList(){
        new manageProduct().addToList(productSelect, buyRequest, Response => {
            if(Response){
                navigate("/orderList")
            }else{
                alert("Ah não! não conseguimos adicionar esse produto na sua lista.")
            }
        })
    }

    useEffect(() => {
        getProductInDb()
    }, []);

    return (
        <>  
            <Header type={2}/>

            <main id="content-show-product">
                <div className="backgroundApresentation"><img src={productSelect.data.images[0]} alt="Images from product" /></div>
                <div className="container-informationShowProduct">
                    <div className="box-content-information">
                        <h1 className="text-nameProduct">{productSelect.data.name}</h1>
                        <div className="box-othersInformation">
                            <div className="box-information">
                                <div className="box-showInformation style-clock">
                                    <img src={clockIcon} alt="Time" />
                                    <span className="text-information">{productSelect.data.time} min</span>
                                </div>
                                <div className="box-showInformation style-appraisal">
                                    <img src={starIcon} alt="Avalização" />
                                    <span className="text-information">{productSelect.data.appraisal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="text-ValueProduct">R$ {productSelect.data.val}</span>
                </div>

                <p className="text-descriptionProduct">{productSelect.data.description}</p>

                <div className="container-touch">
                    <div className="content-interation">
                        <button className={`button-observation ${buyRequest !== "" ? "style-selectObservationRequest" : ""}`}><img src={attentionIcon} alt="OBS" /></button>
                        <button onClick={(e) => addProductToList()} className="button-addList">Adicionar na lista de pedido</button>
                    </div>
                    <textarea className="text-observation" placeholder="Escreva um observação para seu pedido" value={buyRequest} onChange={(e) => setBuyRequest(e.target.value)} />
                </div>

                <div className="container-SeenRecently">
                    <span className="text-SeenRecently">Visto Recentemente</span>
                    <div className="content-carrosel-product">
                        {(allProduct) ? allProduct.map((product, position) => {
                            if(product.data.tag === productSelect.data.tag && product.id !== productSelect.id){
                                return (
                                    <Link to={`/show?swn=${product.id}&sja=${product.data.name.replace(/ /g, "+")}`}><div className="box-minifyProduct"><img src={product.data.images[0]} alt="images product" /></div></Link>
                                )
                            }
                        }) : ""}
                    </div>
                </div>


            
            </main>

            <Navegation/>
        </>
    )
}

export default ShowProduct