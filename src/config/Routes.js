// import dependencias

import React from "react"
import { Routes, Route } from "react-router-dom" 

import Index from "../pages/index"
import ShowProduct from "../pages/ShowProduct"
import OrderList from "../pages/OrderList"
import HistoryRequest from "../pages/HistoryRequest"
import MyAccount from "../pages/MyAccount"
import Pay from "../pages/Pay"
import Login from "../pages/Login"
// import Registre from "../pages/RegistreWithAuth"
import Registre from "../pages/Registre"

import ExamplesDB from "../module/examples/implementacao_db"
import ExampleCreateSVG from "../module/interactiveSvg/SVG"

export default function __Routes(){
    return (
        <Routes>
            <Route exact path="/" element={<Index/>}></Route>
            <Route exact path="/show" element={<ShowProduct/>}></Route>
            <Route exact path="/orderList" element={<OrderList/>}></Route>
            <Route exact path="/historyRequest" element={<HistoryRequest/>}></Route>
            <Route exact path="/account" element={<MyAccount/>}></Route>
            <Route exact path="/pay" element={<Pay/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/registre" element={<Registre/>}></Route>


            {/* examples link */}
            <Route exact path="/example/dp" element={<ExamplesDB/>}></Route>
            <Route exact path="/example/svg" element={<ExampleCreateSVG/>}></Route>
        </Routes>
    )
}
