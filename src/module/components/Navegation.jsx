import React, {Component} from "react";
import { Link } from "react-router-dom";
import {userLog} from "../main"
import "../../style/module/NavegationPage.scss"

import orderedIcon from "../../images/icon/OrderedIcon.svg"
import historyIcon from "../../images/icon/historyIcon.svg"
import userIcon from "../../images/icon/userIcon.svg"

class NavegationPage extends Component {
    constructor(props){
        super()
        this.state = {
            typeLog: "/login"
        }
    }

    componentDidMount() {
        new userLog().init(Response => {
            this.setState({typeLog: Response ? "/account" : "/login"})
        })
    }

    render(){
        return (
            <>
               <nav className="navegationPage">
                    <Link to="/"><span className="Menu-option syle-menu">Menu</span></Link>
                    <Link to="/orderList"><img src={orderedIcon} alt="" className="Menu-option" /></Link>
                    <Link to="/historyRequest"><img src={historyIcon} alt="" className="Menu-option" /></Link>
                    <Link to={this.state.typeLog}><img src={userIcon} alt="" className="Menu-option" /></Link>
               </nav>
            </>
        )
    }
}

export default NavegationPage