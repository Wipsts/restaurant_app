import React, {Component} from "react";
import SeachIcon from "../../images/icon/SeachIcon.svg";
import "../../style/module/SeachBox.scss"

class SearchBox extends Component {
    constructor(props){
        super()
        this.state = {
            FildSeachValue: ""
        }
    }
    
    render(){
        return (
            <>
               <div className="contentSeachBox">
                    <img src={SeachIcon} alt="Search" />
                    <input type="text" id="fieldSeach" placeholder="Pesquise" className="fieldSearch-input" value={this.state.FildSeachValue} onChange={(e) => { this.setState({FildSeachValue: e.target.value}) }}/>
               </div>   
            </>
        )
    }
}

export default SearchBox