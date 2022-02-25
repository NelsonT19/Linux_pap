
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
            .then(data => alert(data.msg), clearBoxs())
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
    const cab = document.getElementById('cab')
    cab.innerHTML = " "
    const cidadesDiv = document.getElementById('tabela')
    cidadesDiv.innerHTML = " "

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
                            <button type="button" value=${i} onclick="showDetail()" class="btnTabela"  data-toggle="modal" data-target="#myModal">
                            Ver detalhes
                          </button>
                            </td>
                       </tr>
                      
                       
                       `
                tabelaUser.innerHTML += row
            }


        })
        .catch((error) => {
            console.log(error)
            console.log('Request failed', error.msg)
        });



}


function showDetail() {
    fetch('http://localhost:3000/table')
        .then(res => res.json())
        .then(users => {

                if (users.msg) {
                    alert(users.msg)
                }
                document.getElementById('tabela').addEventListener("click", function (e) {
                    index = e.target.value
                })
                

                let user = users[index]
            
                let idCard = user.idCard
                let nome = user.nome
                let morada_rua = user.morada_rua
                let morada_num = user.morada_num
                let datanascimento = user.datanascimento
                let email = user.email
                let telemovel = user.telemovel
                let departamento = user.departamento
                let estado = user.estado

                const tabelaUser = document.getElementById('tabela')
                tabelaUser.innerHTML = ''

                const detalhe = document.getElementById('detalhe')
                detalhe.innerHTML += ''
                modelWrap = document.createElement('div')
                modelWrap.innerHTML = 
        `
     
            <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Detalhes Do Utilizador</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                        <div class="containerModel">
                                <div class="row">
                                        <p>Número do Utilizador:  &nbsp;  <td>${idCard}</td></p>
                                        <p>Nome:  &nbsp;  <td>${nome}</td></p>
                                        <p>Morada:  &nbsp;  <td>${morada_rua}</td> </p>
                                        <p>Nº Porta:  &nbsp;  <td>${morada_num}</td> </p>
                                        <p>Data Nascimento:  &nbsp;  <td>${datanascimento}</td> </p>
                                        <p>Email:  &nbsp;  <td>${email}</td> </p>
                                        <p>Telemovel:  &nbsp;  <td>${telemovel}</td> </p>
                                        <p>Departamento:  &nbsp;  <td>${departamento}</td></p>
                                        <p>Estado:  &nbsp;  <td>${estado}</td></p>
          
                                </div>
                        </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       

      `
    document.body.append(modelWrap)
    var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'))
    modal.show()
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




