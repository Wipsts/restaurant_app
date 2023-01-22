function getCookie(c_name) {
    var __x = document.cookie;
    var x = __x.split(";");
    var __y = [];
        for (var i = 0; i < x.length; i++){
            __y.push((x[i].split("=")[0]).replace(/\s/g, ''));
        }
    var y = __y.indexOf(c_name);
    if(y !== -1){
        var namecookie = x[y].split("=")[1];
        return namecookie;
    }
}

function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/"
    return true;
} 

export {getCookie, setCookie}