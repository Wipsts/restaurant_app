import React from "react";

import BackgorundSvg from "./DefaultImage/backgorundDefault"
import Table2 from "./DefaultImage/tables/Table2"
import Table4 from "./DefaultImage/tables/Table4"
import Table6 from "./DefaultImage/tables/Table6"
import Table8 from "./DefaultImage/tables/Table8"

function Main({tables, onClick}){
    function setColor(status){
        const colors = {pending: ["#E9DB60", "#E9DB60", "#4E4E4E"], select: ["#27B5E2", "#27B5E2", "#fff"], unset: ["#D9D9D9", "#8F8F8F", "#4E4E4E"], disable: ["#D56D33", "#D56D33", "#fff"], block: ["#DB6D6D", "#DB6D6D",  "#fff"]}
        if(colors[status]){
            return colors[status]
        }else{
            return colors.disable     
        }
    }
    
    return (
            <svg width="653" height="331" viewBox="0 0 653 331" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="backgroundSVG">
                    <BackgorundSvg/>
                </g>

                <g id="group-tablesSVG">
                    {tables.map((table, i) => {
                        const color = setColor(table.status)
                        // TODO criar variantes das mesas (vertical e horizontal)
                        if(table.tableSelect === "T2"){
                            return <Table2 onClick={onClick} key={i} id={table.idTable} position={table.position} color={color}/>
                        }else if(table.tableSelect === "T4"){
                            return <Table4 onClick={onClick} key={i} id={table.idTable} position={table.position} color={color}/>
                        }else if(table.tableSelect === "T6"){
                            return <Table6 onClick={onClick} key={i} id={table.idTable} position={table.position} color={color}/>
                        }else{
                            return <Table8 onClick={onClick} key={i} id={table.idTable} position={table.position} color={color}/>
                        }
                    })}
                </g>
            </svg>
    )
}


export default Main
