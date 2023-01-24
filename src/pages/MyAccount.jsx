import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import {informationUser} from "../module/main"

import Header from "../module/components/Header";
import Navegation from "../module/components/Navegation";

import LockIcon from "../images/icon/LockIcon.svg"
import "../style/min/MyAccount.scss";

const InputMaskCPF = (props) => (
    <InputMask mask="999.999.999-99" disabled placeholder={props.placeholder} className={props.className} value={props.value} onChange={props.onChange}></InputMask>
  );

function MyAccount(props){
    const [Inputuser, setInputUser] = useState({id: "", name: "", email: "", date: "", cod: ""})
    const [user, setUser] = useState({id: "", name: "", email: "", date: "", cod: ""})
    const navigate = useNavigate();

    function constructUser(){
        new informationUser().getInformationUser(Response => {
            const date =  (Response.data.birthday).split("/")
            const birthday = (date[0]) ? `${date[2]}-${date[1]}-${date[0]}` : date
            const set = {
                id: Response.id, 
                name: Response.data.name, 
                email: Response.data.email, 
                date: birthday, 
                cod: Response.data.cpf
            }

            setUser(set)            
            setInputUser(set)            
        })
    }

    function updateInformationUser(){
        if(user.name !== Inputuser.name || user.date !== Inputuser.date){
            new informationUser().updateInformationUser(user.id, Inputuser.name, Inputuser.date, Response => {
                if(Response){}else{
                    setInputUser(prevState => {return {
                        prevState,
                        name: user.name,
                        date: user.date
                    }})
                }
            })
        }
    }

    function logOut(){
        new informationUser().logoutUser(Response => {
            if(Response){
                navigate("/login")
            }else{
                navigate("/")
            }
        })
    }

    useEffect(() => {
        constructUser()
    },[])

    return (
        <>
            <Header type={0} page="Minha Conta"/>

            <main>
                <div className="container-informationUser">
                    <span className="text-SubTextInformation">Informações</span>

                    <div className="container-interactiveUserInformationAccount">
                        <div className="box-inputInformation">
                            <span className="text-describeInput">E-mail</span>
                            <input type="email" placeholder="E-mail" disabled className="input-Information" value={Inputuser.email}/>
                        </div>
                        <div className="box-inputInformation">
                            <span className="text-describeInput">Nome</span>
                            <input type="text" placeholder="Nome" className="input-Information" value={Inputuser.name} onFocus={(e) => updateInformationUser()} onChange={(e) => {setInputUser(prevState => {return {...prevState, name: e.target.value}})}}/>
                        </div>
                        <div className="box-inputInformation">
                            <span className="text-describeInput">Data de Nacimento</span>
                            <input type="date" className="input-Information" value={Inputuser.date} onFocus={(e) => updateInformationUser()} onChange={(e) => {setInputUser(prevState => {return {...prevState, date: e.target.value}})}}/>
                        </div>
                        <div className="box-inputInformation">
                            <span className="text-describeInput">CPF</span>
                            <InputMaskCPF placeholder="000.000.000-00" disabled className="input-Information" value={Inputuser.cod}/>
                        </div>
                    </div>
                </div>

                <div className="container-protectInteractiveUser">
                    <button className="button-payOptions">
                        Opções de pagamento
                        <img src={LockIcon} alt="" />
                    </button>
                    <button className="button-payOptions style-logout" onClick={(e) => logOut()}>Desconectar</button>
                </div>

                <div className="container-warning">
                    <span className="text-warning"><b>Atenção</b> esses pedidos são de consumo no restaurante, isto é uma comodidade feita para minimizar o tempo de espera da comida e da mesa</span>
                </div>
            </main>
            
            <Navegation/>
        </>
    )
}

export default MyAccount