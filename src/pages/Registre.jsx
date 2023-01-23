import React, {useState, useEffect} from 'react';
import Header from "../module/components/Header";
import {getCookie, registreUser} from "../module/main"
import { Link } from "react-router-dom";
import siteIcon from "../images/icon/siteIcon.svg"
import lockIcon from "../images/icon/LockIcon.svg"
import userIcon from "../images/icon/userIcon.svg"
import "../style/min/Login.scss"

function Login(props){
    const [passwordField, setPasswordField] = useState('')
    const [checkPasswordField, setCheckPasswordField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [configPage, setConfigPage] = useState({protocol: [0,1]})
    const [warning, setWarning] = useState({display: "none", text: ""})
    const [sendOtherEmailTime, setSendOtherEmailTime] = useState("01:30")

    function registre(e){
        e.preventDefault()
        if(!AllFieldsHaveValue()){
            return 
        }
        if(!samePasswords()){
            return
        }
        
        new registreUser().registre(emailField, passwordField, Response => {
            if(Response.registre){
                setConfigPage({protocol: [0,1]})
            }else{
                setWarning({display: "block", text: "Ops! não consiguimos registrar sua conta, verifique as informações e tente novamente"})
            }
        })

        function AllFieldsHaveValue(){
            if(emailField === "" || passwordField === "" || checkPasswordField === ""){
                setWarning({display: "block", text: "Prencha todos os valores"})

                return false
            }else{
                return true
            }
        }

        function samePasswords(){
            if(passwordField !== checkPasswordField){
                setWarning({display: "block", text: "As senhas não coencidem, tente verificar a ortográfia."})
                return false
            }else{
                return true
            }
        }
    }

    function sendEmail(){
        if(timeHasBeenReset){
            new registreUser().sendEmail(emailField, Response => {
                if(Response.send){
                    setSendOtherEmailTime("05:00")
                    setWarning({display: "block", text: "Verifique seu e-mail, lembre de verificar o spam!"})
                }else{
                    setWarning({display: "block", text: "Ops! não conseguimos enviar um email alternativo, tente novamente mais tarde"})
                }
            })
        }

        function timeHasBeenReset(){
            const time = sendOtherEmailTime.split(":")
            if(parseInt(time[0]) === 0 && parseInt(time[1]) === 0){
                return true
            }else{
                return false
            }
        }
    }

    const countDow = () => {
        const time = sendOtherEmailTime.split(":")

        function count(time){
            var minute = parseInt(time[0])
            var second = parseInt(time[1])

            if(minute >= 1 && second >= 0){
                if(minute === 0 && second >= 1){
                    second--
                }else{
                    if(second === 0){
                        minute--
                        second = 59
                    }else{
                        second--
                    }
                }
            }else{
                if(minute === 0 && second === 0 ){
                    minute = 0
                    second = 0
                }else{
                    second--
                }
            }
            return `${(minute <= 9 ? `0${minute}` : minute)}:${second <= 9 ? `0${second}` : second}`
        }

        setSendOtherEmailTime(count(time))
    }

    function registreAuthenticate(form){
        // 0 => google | 1 => apple | 2 => instagram
        new registreUser().registreAutheticate(form)
    }

    function pageSelectWithHistory(){
        if(isRegistre()){
            setPage("already")
        }else{
            setPage("new")
        }

        function isRegistre(){
            return (getCookie("registrePath") && getCookie("registrePath") === "mailVerify") ? true : false
        }

        function setPage(type){
            if(type === "already"){
                setConfigPage(prevState => {return {...prevState, protocol: [0,1]}})
            }else{
                setConfigPage(prevState => {return {...prevState, protocol: [1,0]}})
            }
        }
    }

    useEffect(() => {
        setSendOtherEmailTime("01:30")
        pageSelectWithHistory()
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            countDow()
        }, 1000);
        return () => clearInterval(interval);
    }, [sendOtherEmailTime]);

    return (
        <>
            <Header type={1} page="Cadastrar" link={"/Login"}/>
            <main className='main_login'>

                {configPage.protocol[0] ? (
                    <div className="container-protocol">
                        <div className="container-authenticateLogin">
                            <div onClick={(e) => registreAuthenticate(0)} className="box-authenticator" id="login_google"><img src="" alt="" /></div>
                            <div onClick={(e) => registreAuthenticate(1)} className="box-authenticator" id="login_apple"><img src="" alt="" /></div>
                            <div onClick={(e) => registreAuthenticate(2)} className="box-authenticator" id="login_instagram"><img src="" alt="" /></div>
                        </div>

                        <div className="container-loginDefault container-registreDefault">
                            <div className="container-warningRegistre style-warning" style={{display: warning.display}}><span>{warning.text}</span></div>
                            <form onSubmit={registre}>
                                <div className="box-interativeUser">
                                    <span className='text-inputField'>E-mail</span>
                                    <input type="email" id="emailField" className='input-FieldInterative' placeholder='E-mail' value={emailField} onChange={(e) => {setEmailField(e.target.value)}}/>
                                </div>
                                <hr />
                                <div className="box-interativeUser">
                                    <span className='text-inputField'>Senha</span>
                                    <input type="password" minLength={5} autoComplete="on" id="passwordField" className='input-FieldInterative' placeholder='Senha' value={passwordField} onChange={(e) => {setPasswordField(e.target.value)}}/>
                                </div>
                                <div className="box-interativeUser">
                                    <span className='text-inputField'>Confirmar Senha</span>
                                    <input type="password" minLength={5} autoComplete="on" id="checkPasswordField" className='input-FieldInterative' placeholder='Senha' value={checkPasswordField} onChange={(e) => {setCheckPasswordField(e.target.value)}}/>
                                </div>
                                
                            
                                <div className="box-interativeUser">
                                    <button type="submit" className='button-formButton style-registre'>Cadastrar</button>
                                </div>
                            </form>
                        </div>

                        <Link to="/login"><button className='button-alterateTypeUser style-login'>Login</button></Link>
                    </div>

                ) : (
                    <div className="container-protocol">
                        <div className="container-warningRegistre style-warning" style={{display: warning.display}}><span>{warning.text}</span></div>

                        <div className="container-emailVerify">
                            <div className="container-warningRegistre"><span><b>Enviamos um código</b> de confirmação para “<i>{emailField}</i>”, verifique o spam caso não o encontre</span></div>
                            <div className="container-content-image">
                                <div className="content-images">
                                    <img src={siteIcon} alt="" className='image-Site'/>
                                    <img src={lockIcon} alt="" className='image-Lock'/>
                                    <img src={userIcon} alt="" className='image-User'/>
                                </div>
                                <div className="box-ball style-right"></div>
                                <div className="box-ball style-left"></div>
                            </div>
                            <span onClick={(e) => sendEmail(e)} className='text-confirmCode'>Reenviar código ({sendOtherEmailTime})</span>                            
                        </div>

                        <Link to="/login"><button className='button-formButton'>Login</button></Link>
                    </div>
                )}

            </main>
        </>
    )
}

export default Login