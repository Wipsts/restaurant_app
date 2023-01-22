class registreUser{
    // constructor(){
    // }

    registreAutheticate(form){
        // TODO registre with autheticate
    }

    registreNewUser(email, password){
        // registre new user and create code and send email
        // TODO realizar a criptografia atravez de um salt que só pertece ao usuário -> 0-1000000 | a senha já vem cripografada com um salt basico (10)
        
        console.log("new user")
        return {registre: true, code: 11111} // resposta esperada
    }

    registre(email, password, code, codeGenerate){
        // TODO registre in BD
        console.log("registre")
    }
}
export default registreUser