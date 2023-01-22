import React, {Component} from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../../images/icon/arrowIcon.svg";

import "../../style/module/Header.scss"
import OrderedIcon from "../../images/icon/OrderedIcon.svg"
import LockIcon from "../../images/icon/LockIcon.svg"

function AlternativeStyle({type}){
    return (
        <header className="header-alternativeStyle">
            <Link to="/"><button className="button-backpage"><img src={arrowIcon} alt="Back" /></button></Link>
            <Link to="/orderList"><div className="content-bar-menu style-alternative-menu"><img src={type === 1 ? LockIcon : OrderedIcon} alt="Pedido"/></div></Link>
        </header>
    )
}

function DefaultStyle({type, page}){
    return (
        <header>
            <h1 className="tittle-page">{page}</h1>
            <Link to="/orderList"><div className="content-bar-menu"><img src={type === 1 ? LockIcon : OrderedIcon} alt="Pedido"/></div></Link>
        </header>
    )
}


function ArrowStyle({type, page, link}){
    return (
        <header className="header-stylePay">
            <div className="container-PayStyle">
                <Link to={link}><img src={arrowIcon} alt="Back" /></Link>
                <h1 className="tittle-page">{page}</h1>
            </div>
            <div className="content-bar-menu"><img src={LockIcon} alt="Lock"/></div>
        </header>
    )
}

class Header extends Component {
    constructor(props){
        super()
        this.type = props.type
        this.page = (props.page) ? props.page : "Name Page"
        this.link = (props.link) ? props.link : "/orderList"
    }
    
    render(){
        return (
            <>
                {this.type === 2 ? <AlternativeStyle type={this.type}/> : this.type === 1 ? <ArrowStyle type={this.type} link={this.link}  page={this.page}/> : <DefaultStyle type={this.type} page={this.page}/>}
            </>
        )
    }
}

export default Header