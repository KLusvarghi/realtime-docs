// esse arquivo faz referencia ao index.js

import { insertLinkDocument } from "./index.js"

const socket = io()

// emitindo um evento para o servidor
socket.emit('get_documents', (documents) => {
  console.log(documents)
  documents.forEach((document) => {
    insertLinkDocument(document.name)
  });
})
