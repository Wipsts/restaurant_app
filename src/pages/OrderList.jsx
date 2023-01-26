import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom"
import {manageProduct, userLog} from "../module/main"

import Header from "../module/components/Header";
import SeachBox from "../module/components/SeachBox";
import Navegation from "../module/components/Navegation";

import clockIcon from "../images/icon/clockIcon.svg";           
import starIcon from  "../images/icon/starIcon.svg";           
import "../style/min/orderList.scss";
import "../style/min/index.scss";


function OrderList(props){
    const [allProduct, setAllProduct] = useState([])
    const [listUser, setListUser] = useState([])
    const [configList, setConfigList] = useState({totalValue: "0,00"})
    const [removeProductRef, setRemoveProductRef] = useState({id: "", remove: null})
    const [userIsLog, setUserIsLog] = useState(false)
    const navigate = useNavigate();
    
    function listProductList(){
        new manageProduct().showListUser(Response => {
            // {idsProductList: "", totalValue: "", allProduct: ""}            
            const productList = getProductList(Response.allProduct, Response.idsProductList)
            setAllProduct(Response.allProduct)
            setListUser(productList)
            setConfigList(prevState => {return{prevState, totalValue: Response.totalValue}})            
        })

    }
    
    function getProductList(products, listUser){
        var productList = []
        for (let i = 0; i < products.length; i++) {
            const singularProduct = products[i];
            for (let i = 0; i < listUser.length; i++) {
                const idsSingularList = listUser[i];
                if(singularProduct.id === idsSingularList){
                    productList.push(singularProduct)
                }
            }
        }
        return productList
    }

    function removeProduct(idRemove){    
        if(idRemove){
            if(removeControler(idRemove)){
                new manageProduct().removeToList(idRemove, listUser, Response => {
                    // {remove: true, list: ""}
                    if(Response.remove){
                        const productList = getProductList(allProduct, Response.list)
                        setListUser(productList)
                        setConfigList(prevState => {return{prevState, totalValue: Response.totalValue}})
                    }else{

                    }
                })
            }
        }else{
            // remove all
        }

        function removeControler(idRemove){
            if(removeProductRef.remove && removeProductRef.id === idRemove){
                return true
            }else{
                setRemoveProductRef({id: idRemove, remove: true})
                return false
            }
        }
    }

    function requestPay(){
        navigate("/pay")
    }

    useEffect(() => {
        listProductList()
        new userLog().init(Response => {
            setUserIsLog(Response)
        })
    }, []);

    return (
        <>
            <Header type={0} page="Lista de Pedido"/>

            <main>
                <SeachBox/>

                {(userIsLog) ? (
                    <>
                        <div className="content-Product style-orderList">
                            <div className="box-Products">

                                {listUser ? listUser.map((product, position) => (
                                    <div className="showProduct" key={product.id}>
                                        
                                        <div className="imgContent style-removeProduct" onClick={(e) => removeProduct(product.id)}><img src={product.data.images[0]} alt="Product" /></div> 
                                        
                                        <div className="Informations-Product">
                                            <span className="text-NameProduct">{product.data.name}</span>
                                            <div className="box-information">
                                                <div className="box-showInformation style-clock">
                                                    <img src={clockIcon} alt="Time" />
                                                    <span className="text-information">{product.data.time} min</span>
                                                </div>
                                                <div className="box-showInformation style-appraisal">
                                                    <img src={starIcon} alt="Avalização" />
                                                    <span className="text-information">{product.data.appraisal}</span>
                                                </div>
                                            </div>
                                            <span className="text-value">R$ {parseFloat(product.data.val).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                                        </div>
                                    </div>
                                )) : ""}

                            </div>

                            {/* <button className="button-removeAll">Remover Tudo</button> */}
                        </div>

                        <div className="container-content-value">
                            <div className="box-value">
                                <span className="text-valueTxt">Total: </span>
                                <span className="text-valueNum">R$ {parseFloat(configList.totalValue).toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
                            </div>

                            <button onClick={(e) => requestPay()} className="button-finishPurchase">Ir para Pagamento</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container-logInMove">
                            <span className="text-WarningLogin">Login</span>
                            <span className="text-subWarningLogin">Faça login para adicionar produtos a sua lista e personalizar sua conta do seu jeito</span>
                            <Link to="/login"><button className="button-warningLogin">Fazer Login</button></Link>
                        </div>
                    </>
                )}
            </main>
            
            <Navegation/>
        </>
    )
}

export default OrderList