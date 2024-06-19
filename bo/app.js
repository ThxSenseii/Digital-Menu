const { error } = require("console");

function login () {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch ("http://localhost:3000/api/user/login", {
        method:"POST", body:{user:username, password:password}
    }).then (token => {console.log ("token", token)} 
    ).catch(error => {console.log ("error", error)}) ;
    
}
document.addEventListener ("DOMContentLoaded", () => {
    document.getElementById ("login-button").addEventListener("click", login);
} )