// esse arquivo faz referencia ao index.js

import { insertLinkDocument, removeLinkDocument } from "./index.js"

const socket = io()

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
