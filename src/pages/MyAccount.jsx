import React, {useState} from "react";
import InputMask from 'react-input-mask';

import Header from "../module/components/Header";
import Navegation from "../module/components/Navegation";

import LockIcon from "../images/icon/LockIcon.svg"
import "../style/min/MyAccount.scss";

const InputMaskCPF = (props) => (
    <InputMask mask="999.999.999-99" placeholder={props.placeholder} className={props.className} value={props.value} onChange={props.onChange}></InputMask>
  );

function MyAccount(props){
    const [user, setUser] = useState({id: "", name: "", email: "", date: "", cod: ""})


    return (
        <>
            <Header type={0} page="Minha Conta"/>

            <main>
                <div className="container-informationUser">
                    <span className="text-SubTextInformation">Informações</span>

                    <div className="container-interactiveUserInformationAccount">
                        <div className="box-inputInformation">
                            <span className="text-describeInput">E-mail</span>
                            <input type="email" placeholder="E-mail" className="input-Information" value={user.email} onChange={(e) => {setUser(prevState => {return {...prevState, email: e.target.value}})}}/>
                        </div>
                        <div className="box-inputInformation">
                            <span className="text-describeInput">Nome</span>
                            <input type="text" placeholder="Nome" className="input-Information" value={user.name} onChange={(e) => {setUser(prevState => {return {...prevState, name: e.target.value}})}}/>
                        </div>
                        <div className="box-inputInformation">
                            <span className="text-describeInput">Data de Nacimento</span>
                            <input type="date" className="input-Information" value={user.date} onChange={(e) => {setUser(prevState => {return {...prevState, date: e.target.value}})}}/>
                        </div>
                        <div className="box-inputInformation">
                            <span className="text-describeInput">CPF</span>
                            <InputMaskCPF placeholder="000.000.000-00" className="input-Information" value={user.cod} onChange={(e) => {setUser(prevState => {return {...prevState, cod: e.target.value}})}}/>
                        </div>
                    </div>
                </div>

                <div className="container-protectInteractiveUser">
                    <button className="button-payOptions">
                        Opções de pagamento
                        <img src={LockIcon} alt="" />
                    </button>
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