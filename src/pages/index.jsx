import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {QUERY} from "../module/main"

import Header from "../module/components/Header";
import SeachBox from "../module/components/SeachBox";
import Navegation from "../module/components/Navegation";

import clockIcon from "../images/icon/clockIcon.svg";           
import starIcon from  "../images/icon/starIcon.svg";           
import "../style/min/index.scss";

function Index(props){
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [tags, setTags] = useState([])
    
    function searchAndShowProduct(){
        if(sessionStorage.getItem('sessionAllProduct') && JSON.parse(sessionStorage.getItem('sessionAllProduct'))[0]){
            const product = JSON.parse(sessionStorage.getItem('sessionAllProduct'))
            setProducts(product)
            setAllProducts(product)
            setTag(product)
        }else{
            getProduct(Response => {
                setProducts(Response)
                setAllProducts(Response)
                setTag(Response)
                sessionStorage.setItem('sessionAllProduct', JSON.stringify(Response));
            })
        }

        function setTag(products){
            const getTags = products.map(key => {
                const product = key.data
                return product.tag
            })
            setTags(getTags)
        }
        
        function getProduct(res){
            QUERY('get', {'bd': "product", 'select': ""}, "null", response => {
                res(response)
            })
        }
    }

    function filterWithTag(tag){
        var filtered
        if(tag){
            filtered = allProducts.map(key => {
                const product = key.data
                if(product.tag === tag){
                    return key
                }else{
                    return undefined
                }
            })
        }else{
            filtered = allProducts
        }

        setProducts(filtered.filter(key => key))
    }

    useEffect(() => {
        searchAndShowProduct()
    }, []);

    return (
        <>
            <Header type={0} page="Menu"/>

            <main>
                <SeachBox/>

                <div className="content-Product">
                    <nav className="listFilter">
                        <span onClick={(e) => filterWithTag()} className="text-Filters text-filterSelect">Todos</span>
                        {(tags) ? tags.map((tag, i) => (
                            <span key={`tag-${i}`} onClick={(e) => filterWithTag(tag)} className="text-Filters">{tag}</span>
                        )) : ""}
                    </nav>

                    <div className="box-Products">

                        { (products[0]) ? products.map((product, position) => (
                            <Link to={`/show?swn=${product.id}&sja=${product.data.name.replace(/ /g, "+")}`} key={product.id}>
                                <div className="showProduct" >
                                    <div className="imgContent"><img src={product.data.images[0]} alt="Product" /></div>
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
                                        <span className="text-value">R$ {product.data.val}</span>
                                    </div>
                                </div>
                            </Link>
                        )) : ""}

                    </div>
                </div>

            </main>
            
            <Navegation/>
        </>
    )
}

export default Index