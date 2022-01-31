let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    
}



function init (){
   getTipos();
  
}



function getTipos(){
    
    const tipos = document.getElementById('tipo')
    fetch('http://localhost:3000/formdata')
    .then(res => res.json())
    .then(data => {
        for(let i=0; i<data[0].departamentos.length; i++){
            const op = 
            `<option>${data[0].departamentos[i]}</option>`
            tipos.innerHTML += op
        }
    })
    .catch(error =>{
        console.log(error)
    })
}



function insertUtilizador(){

    const nome = document.getElementById('nome').value
    if(nome=='')
        alert('Tem de preencher o nome.')

    const morada_rua = document.getElementById('morada_rua').value
    if(morada_rua=='')
        alert('Tem de preencher a rua.')

    const morada_num = document.getElementById('morada_num').value
    if(morada_num=='')
        alert('Tem de preencher o número.')

    const dnasc = document.getElementById('dnasc').value
    if(dnasc=='')
        alert('Tem de indicar uma data de nascimento.')
    
    const email = document.getElementById('email').value
    if(email=='')
        alert('Tem de indicar um email.')

    const telem = document.getElementById('telem').value
    if(telem=='')
        alert('Tem de indicar um telemóvel.')
    else {
        let i = 0
        for(i; i<telem.length; i++){
            let c = telem.charAt(i)
            if(isNaN(c)){
                alert('Numero inválido')
                console.log('número inválido')
                break
            }       
        }
        console.log(i)
        if(i == telem.length){
            const telemInt = parseInt(telem)
            console.log(telemInt)
        }
    }
  
    const tipo = document.getElementById('tipo').value
    if(tipo=='')
        alert('Tem de indicar um tipo')
        else console.log(tipo)

        const idcard = document.getElementById('tag').value
        if(idcard=='')
            alert('Tem de indicar uma tag.')


    const obj = {
        idCard:idcard,
        nome: nome,
        morada_rua: morada_rua,
        morada_num: morada_num,
        datanascimento:dnasc,
        email:email,
        telemovel:telem,
        departamento:tipo,
    }

    jsonObj = JSON.stringify(obj)


        var options = {
            method:'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: jsonObj
        }

        
        fetch('http://localhost:3000/createCard',options)
        .then(res => res.json())
        .then(data => alert(data.message))
        .catch((err) => {
            console.log('Request failed', err.message)
        });
    }



function cleanDiv(){

    const cidadesDiv = document.getElementById('tabela')
    cidadesDiv.innerHTML=" "
}




