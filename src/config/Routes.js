// import dependencias

import React from "react"
import { Routes, Route } from "react-router-dom" 
import Index from "../pages/Index"

export default function __Routes(){
    return (
        <Routes>
            <Route exact path="/" element={<Index/>}></Route>
        </Routes>
    )
}
