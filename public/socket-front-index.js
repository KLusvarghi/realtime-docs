// esse arquivo faz referencia ao index.js

import { insertLinkDocument, removeLinkDocument } from "./index.js"
import { getCookie } from "./utils/cookies.js";

// aqui, precisamos mandar para o servidor o socket que está acessando para nosso middleware, porém, o middleware é executado antes mesmo do socket ser criado, então, vamos usar a função do io() que já cria o socket para nós, e assim podemos usar o socket para emitir eventos e escutar eventos do servidor
const socket = io("/users", { //dessa maneira estamos criando um namespace chamado "users", e assim, podemos separar os eventos que serão emitidos e escutados apenas nesse namespace, e não no namespace principal "/"
  // "auth" é um objeto que será enviado para o servidor, e o servidor irá verificar se o usuário está autenticado ou não
  // sendo um propriedade já esperada pelo socket.io, e que será enviada para o servidor
  auth: {
    tokenJwt: getCookie("tokenJwt")
  }
})

// esse é um evento é um tipo de evento proprio do socket.io que é emitido quando emitimos um error no next do middleware
socket.on("connect_error", (error) => {
  alert(error);
  window.location.href = "/login/index.html"
});

// emitindo um evento para obter os documentos existentes no banco
socket.emit('get_documents', (documents) => {
  // console.log(documents)
  documents.forEach((document) => {
    insertLinkDocument(document.name)
  });
})

export function createNewDocument(documentName) {
  // emitindo um evento para o servidor
  socket.emit('new_document', documentName)
}

// irá escutar o evento que caso seja criado um novo documento, ele irpa inserir o link do documento na tela sem ter que dar reload
socket.on("add_newDocument_interface", (documentName) => {
  insertLinkDocument(documentName)
})
// 


// irá escurtar o evento caso o documento já exista
socket.on("document_already_exists", (documentName) => {
  alert(`O documento ${documentName} já existe!`)
})


// para que possamos atualizar a página inicial com os documentos existente, iremos escutrar o evento de quando um documento é excluido com sucesso
socket.on("delete_document_success", (documentName) => {
  // e apenas chamamos a func que irá atualizar o html com o valor recebido pelo servidor
  removeLinkDocument(documentName)
})
