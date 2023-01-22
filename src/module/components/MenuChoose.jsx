/* eslint-disable no-useless-constructor */
import React, {Component} from "react";
import InteractiveMenu from "../interactiveSvg/SVG"
import "../../style/module/MenuChoose.scss"

class MenuChoose extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayMenu: "none",
            babyChair: "0",
            handicappedPerson: "0",
            TableSelect: {idTable: "", tableSelect: "0"}
        }
    }

    componentDidMount() {
        // example useEffect(()=>{},[])
        if(this.props.mode === "style-CloseMenu"){
            setTimeout(()=>{
                this.setState({displayMenu: "none"})
            },1000)
        }else{
            this.setState({displayMenu: "block"})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.mode !== prevProps.mode) {
            if(this.props.mode === "style-CloseMenu"){
                setTimeout(()=>{
                    this.setState({displayMenu: "none"})
                },1000)
            }else{
                this.setState({displayMenu: "block"})
            }
        }
    }

    passRequest(){
        const teste = this.props.CloseMenuOnclickButton
        const config = {
            configTable_user: [(this.state.babyChair >= 1 ? parseInt(this.state.babyChair) : 0), parseInt(this.state.handicappedPerson)],
            configTable_table: this.state.TableSelect,
        }
        this.props.configTablesRequest(config)
        teste()
    }

    render(){
        const resultChildren = t => {
            this.setState({TableSelect: t})
        }
        

        return (
            <>
                <div className={`container-MenuChoose ${this.props.mode}`} style={{display: this.state.displayMenu}}>
                    <button onClick={this.props.CloseMenuOnclickButton} className="button-closeMenu">X</button>
                    <InteractiveMenu configBlocks={[(this.state.babyChair >= 1 ? 1 : 0), parseInt(this.state.handicappedPerson)]} passValToParent={resultChildren}/>
                    <div className="container-informationTable">
                        <span className="text-SubTextInformation">Configuração da mesa</span>                    
                        <div className="content-tableSelect style-SelectChoose">{this.state.TableSelect.idTable ? this.state.TableSelect.idTable : ""}</div>

                        <div className="content-interactiveOptionTable">
                            <div className="box-informationOptionTableChoose">
                                <span className="text-informationChoose">Cadeiras: </span>
                                <div className="button-informationChoose">{this.state.TableSelect.tableSelect}</div>
                            </div>
                            <div className="box-informationOptionTableChoose">
                                <span className="text-informationChoose">Cadeira para bebê: </span>
                                <select className="button-informationChoose" value={this.state.babyChair} onChange={(e) => this.setState({babyChair: e.target.value})}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>

                            <div className="box-informationOptionTableChoose">
                                <span className="text-informationChoose">Pessoa com deficiência: </span>
                                <select className="button-informationChoose" value={this.state.handicappedPerson} onChange={(e) => this.setState({handicappedPerson: e.target.value})}>
                                    <option value="0">Não</option>
                                    <option value="1">Sim</option>
                                </select>
                            </div>
                        </div>  
                    </div>

                    <button onClick={(e) => {this.passRequest()}} className="button-ChooseTable">Escolher mesa</button>
                </div>
            </>
        )
    }
}

export default MenuChoose