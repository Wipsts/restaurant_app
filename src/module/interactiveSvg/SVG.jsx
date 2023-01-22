import React, { Component } from "react";
import SVGCreate from "./main";
import bigWidthArrowIcon from "../../images/icon/bigWidthArrowIcon.svg"
import "./style/svg.scss"

// example database tables
import ExampleTablesJson from "../../server/example/example.tables.json"

class SVGCreateClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            tables: [],
        }
    }

    selectTable(val){
        const idTable = val.target.id.split("-")[1]

        if(idTable){
            const table = this.state.tables
            var newTable = table.map((t, i) => {                
                t.status = _unselectTables(t)
                if(_CheckIDisIDTable(t, idTable) && _checkTableAvailability(t.status)){
                    this.pass({idTable: t.idTable, tableSelect: (t.tableSelect.split("")[1])})
                    return _SelectTable(t)
                }else{
                    return t
                }
            })

            this.setState({tables: newTable})
        }

        function _CheckIDisIDTable(t, idTable){
            return t.idTable === idTable
        }

        function _SelectTable(t){
            t.status = "select"
            return t
        }

        function _unselectTables(t){
            if(t.status === "select"){
                return "unset"
            }else{
                return t.status
            }
        }

        function _checkTableAvailability(status){
            if(status === "block" || status === "disable" || status === "pending"){
                return false
            }else{
                return true
            }
        }
    }

    componentDidMount() {
        // example useEffect(()=>{},[])
        this.blockTablesWithOptions()
        // TODO bloquear if [1,0] --- criança/deficiente
    }

    blockTablesWithOptions(){
        const config = this.props.configBlocks

        var tables = ExampleTablesJson.map((t, i) => {
            if(config.includes(1)){
                if(config[0] === 1 && config[1] === 1){
                    return blockAllTablesWithOption1(t)
                }else{
                    return checkIfTablesExistBlock(t, config)
                }
            }else{
                return returnDefaultTable(t)
            }
        })

        function checkIfTablesExistBlock(t, config){
            if(config[0]){
                return _existBlockIf(t, 0)
            }else{
                return _existBlockIf(t, 1)
            }

            function _existBlockIf(t, position){
                if(t.blockIf[position] === 1){
                    return disableTable(t)
                }else{    
                    return returnDefaultTable(t)
                }   
            }
        }

        function blockAllTablesWithOption1(t){
            if(t.blockIf.includes(1)){
                return disableTable(t)
            }else{
                return returnDefaultTable(t)
            }
        }

        function disableTable(t){
            if(t.status === "unset" || t.status === "select"){
                t.status = "disable"
            }
            return t
        }

        function returnDefaultTable(t){
            if(t.status === "disable" || t.status === "unset"){
                t.status = "unset"
            }
            return t
        }

        this.setState({tables: tables})
    }

    componentDidUpdate(prevProps){
        if(this.props.configBlocks !== prevProps.configBlocks){
            this.blockTablesWithOptions()
        }
    }

    pass(t){
        this.props.passValToParent(t)
    }

    render(){
        return(
            <>
                <div className="container-content-InteractiveSvgImage">
                    <div className="container-svgGenerate">
                        <SVGCreate onClick={(e) => this.selectTable(e)} tables={this.state.tables}/>
                    </div>
                    <div className="container-Scrolling">
                        <img src={bigWidthArrowIcon} alt="----->" />
                        <span className="text-scrolling">Scrolling</span>
                    </div>
                </div>
            </>
        )
    }
}

export default SVGCreateClass