//login 

function validationRegister() {

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value


    if (!name || !email || !password || !password2) {
        alert("All fields are require")
    }
    //email validation
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
        alert('Ivalid Email')
    }

    //password length
    if (password.length < 6) {
        alert('Password len must be min 6')
    }

    //match password
    if (password !== password2) {
        alert('Passwords doest match')
    }
}

function validationLogin(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    
    if (!email || !password) {
        alert("All fields are require")
    }
    //email validation
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
        alert('Ivalid Email')
    }

    




}