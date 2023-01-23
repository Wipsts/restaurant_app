import React, {useState, useEffect} from 'react';
import Header from "../module/components/Header";
import {getCookie, registreUser} from "../module/main"
import { Link } from "react-router-dom";
import "../style/min/Login.scss"

function Login(props){
    const [passwordField, setPasswordField] = useState('')
    const [checkPasswordField, setCheckPasswordField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [configPage, setConfigPage] = useState({protocol: [1,0]})
    const [warning, setWarning] = useState({display: "none", text: ""})

    function registreWithEmail(e){
        e.preventDefault()
        if(emailField === ""){
            setWarning({display: "block", text: "Preencha todos os campos!"})
            return 
        }        
        
        new registreUser().registre(emailField, Response => {
            if(Response.registre){
                setConfigPage({protocol: [0,1]})
            }else{
                setWarning({display: "block", text: "Ops! não consiguimos registrar sua conta, verifique as informações e tnete novamente"})
            }
        })

    }

    function registre(e){
        e.preventDefault()
        if(!AllFieldsHaveValue()){
            return 
        }   
        if(!samePasswords()){
            return
        }

        new registreUser().confirmEmailAndRegistre(emailField, passwordField, Response => {
            if(Response.registre){
                
            }else{
                if(Response.why === "email"){
                    setWarning({display: "block", text: "O email não foi verificado"})
                }else if(Response.why === "email"){
                    setWarning({display: "block", text: "Ah não! tivemos um erro, tente novamente mais tarde"})
                }
            }
        })
    
        function samePasswords(){
            if(passwordField !== checkPasswordField){
                setWarning({display: "block", text: "As senhas não coencidem, tente verificar a ortográfia."})
                return false
            }else{
                return true
            }
        }
        function AllFieldsHaveValue(){
            if(emailField === "" || passwordField === "" || checkPasswordField === ""){
                setWarning({display: "block", text: "Prencha todos os valores"})

                return false
            }else{
                return true
            }
        }
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
        pageSelectWithHistory()
    }, []);

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

                        <div className="container-loginDefault">
                            <div className="container-warningRegistre style-warning" style={{display: warning.display}}><span>{warning.text}</span></div>
                            <form onSubmit={registreWithEmail}>
                                <div className="box-interativeUser">
                                    <span className='text-inputField'>E-mail</span>
                                    <input type="email" id="emailField" className='input-FieldInterative' placeholder='E-mail' value={emailField} onChange={(e) => {setEmailField(e.target.value)}}/>
                                </div>                                
                            
                                <div className="box-interativeUser">
                                    <button type="submit" className='button-formButton style-registre'>Continuar</button>
                                </div>
                            </form>
                        </div>

                        {/* <Link to="/login"><button className='button-alterateTypeUser style-login'>Login</button></Link> */}
                    </div>
                ) : (
                    <div className="container-protocol">
                        <div className="container-warningRegistre"><span><b>Enviamos um código</b> de confirmação para “<i>{emailField}</i>”, verifique o spam caso não o encontre</span></div>
                        <span className='text-confirmCode'>Reenviar código (1:00)</span>                            
                        <div className="container-warningRegistre style-warning" style={{display: warning.display}}><span>{warning.text}</span></div>

                        <div className="container-registreDefault">
                            <form onSubmit={registre}>
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
                    </div>
                )}

            </main>
        </>
    )
}

export default Login