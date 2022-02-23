
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    
}


let cardID=''

function init (){
    clearBoxs();
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
    const morada_rua = document.getElementById('morada_rua').value
    const morada_num = document.getElementById('morada_num').value
    const dnasc = document.getElementById('dnasc').value
    const email = document.getElementById('email').value
    const telem = document.getElementById('telem').value
    const tipo = document.getElementById('tipo').value
    const idcard = document.getElementById('tag').value
       
    if (idcard == '' || nome == '' || morada_rua == '' || morada_num == '' || dnasc == '' || email == '' || telem == '') {

        const classlb = document.getElementsByClassName('obrig')
        for (let i = 0; i < classlb.length; i++) {
            classlb[i].innerHTML = `*Obrigatório`
        }
        alert("Preencha todos os campos!")
        document.getElementsByClassName('nobrig').innerHTML = " "
    }else{
        const obj = {
            idCard: idcard,
            nome: nome,
            morada_rua: morada_rua,
            morada_num: morada_num,
            datanascimento: dnasc,
            email: email,
            telemovel: telem,
            departamento: tipo,
        }

        jsonObj = JSON.stringify(obj)


        var options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: jsonObj
        }


        fetch('http://localhost:3000/createCard', options)
            .then(res => res.json())
            .then(data => alert(data.msg))
            .catch((err) => {
                console.log('Request failed', err.message)
            });
        }
       
    }


        
 function readcard(){
     fetch('http://localhost:3000/readcard')
    .then(res => res.json())
    .then(data => {
        //setTimeout(readcard, 5000);
        if(data){
            //let tag = data.cardID.replace(/\s/g,'')
            //tirar os espaços
            const textBoxTag = document.getElementById('tag')
            textBoxTag.value = data
            setcardID(tag)
        }
        /*else {
            alert('Não foi possível ler o cartão')
        }*/
    })
       .catch((err) => {
        alert('Não foi possível ler o cartão')
    })
    

   
    //setTimeout(readcard, 5000);
    //clearTimeout(readcard)
    
    

 }

function tableusers() {

    fetch('http://localhost:3000/table')
        .then(res => res.json())
        .then(users => {

            if (users.msg) {
                alert(users.msg)
            }

            const cab = document.getElementById('cab')
            cab.innerHTML += `
      
        <thead>
        <tr>
          <th scope="col">Cartão</th>
          <th scope="col">Nome</th>
          <th scope="col">Departamento</th>
          <th scope="col">Estado</th>
          <td>Detalhes</td>
         
          
        </tr>
      </thead>
        `
            const tabelaUser = document.getElementById('tabela')
            tabelaUser.innerHTML = ''
            for (var i = 0; i < users.length; i++) {
                let idCard = users[i].idCard
                let nome = users[i].nome
                let departamento = users[i].departamento
                let estado = users[i].estado

                let row = `<tr>
                            <td>${idCard}</td>
                            <td>${nome}</td>
                            <td>${departamento}</td>
                            <td>${estado}</td>
                            <td>
                            <button type="button" class="btnTabela" data-toggle="modal" data-target="#exampleModalCenter">
                            Ver detalhes
                          </button>
                            </td>
                       </tr>
                       
                       `
                tabelaUser.innerHTML += row
            }


        })
        .catch((error) => {
            console.log('Request failed', error.msg)
        });



}

 

 function setcardID(card){
    cardID = card
    console.log(cardID)
 }






 //clear functions


 function clearBoxs(){
    document.getElementById('nome').value=''
    document.getElementById('morada_rua').value=''
    document.getElementById('morada_num').value=''
    document.getElementById('dnasc').value=''
    document.getElementById('email').value=''
    document.getElementById('telem').value=''
    document.getElementById('tag').value=''

 }


function cleanDiv(){

    const cidadesDiv = document.getElementById('tabela')
    cidadesDiv.innerHTML=" "
}




