import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "../module/components/Header";
import "../style/min/Login.scss"

import {authenticateLogin} from "../module/main.js"

function Login(props){
    const [passwordField, setPasswordField] = useState('')
    const [emailField, setEmailField] = useState('')
    const [warning, setWarning] = useState({display: "none", text: ""})
    const navigate = useNavigate();

    function loginForm(e){
        e.preventDefault()
        if(emailField === "" || passwordField === ""){
            setWarning({display: "block", text: "Preencha todos os campos."})
            return 
        }        
        
        const reponseLogin = new authenticateLogin().logUser(emailField, _cripyPass(passwordField))        
        if(reponseLogin.login){navigate("/account")}else{setWarning({display: "block", text: "Usuário ou senha incorretos, verifique a ortográfia e tente novamente!"})}

        function _cripyPass(pass){
            // var bcrypt = require('bcryptjs');
            // const salt = bcrypt.genSaltSync(10);
            // const hash = bcrypt.hashSync(pass, salt);
            return pass
        }
    }

    function loginAuthenticate(form){
        // 0 => google | 1 => apple | 2 => instagram
        new authenticateLogin().loginWithAuthenticate(form)
    }

    return (
        <>
            <Header type={1} page="Login" link={"/"}/>
            <main className='main_login'>
                <div className="container-authenticateLogin">
                    <div onClick={(e) => loginAuthenticate(0)} className="box-authenticator" id="login_google"><img src="" alt="" /></div>
                    <div onClick={(e) => loginAuthenticate(1)} className="box-authenticator" id="login_apple"><img src="" alt="" /></div>
                    <div onClick={(e) => loginAuthenticate(2)} className="box-authenticator" id="login_instagram"><img src="" alt="" /></div>
                </div>

                <div className="container-loginDefault">
                    <div className="container-warningRegistre style-warning" style={{display: warning.display}}><span>{warning.text}</span></div>
                    <form onSubmit={loginForm}>
                        <div className="box-interativeUser">
                            <span className='text-inputField'>E-mail</span>
                            <input type="email" id="emailField" className='input-FieldInterative' placeholder='E-mail' value={emailField} onChange={(e) => {setEmailField(e.target.value)}}/>
                        </div>
                        <div className="box-interativeUser">
                            <span className='text-inputField'>Senha</span>
                            <input type="password" minLength={5} autoComplete="on" id="passwordField" className='input-FieldInterative' placeholder='Senha' value={passwordField} onChange={(e) => {setPasswordField(e.target.value)}}/>
                        </div>
                    
                        <div className="box-interativeUser">
                            <button type="submit" className='button-formButton'>Entrar</button>
                            <span className='text-forgoutPassord'>Redefinir senha</span>
                        </div>
                    </form>
                </div>

                <Link to="/registre"><button className='button-alterateTypeUser'>Cadastrar</button></Link>
            </main>
        </>
    )
}

export default Login