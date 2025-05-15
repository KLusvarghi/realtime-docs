import { alertAndRedirect, updateEditorText } from './document.js'

// só com essa linha, assim que o usuar entrar nesse aquivo pelo browser, o socket irá conectar ele ao servidor que criamos no arquivo server.js, assim gernado uma "connection" entre o cliente e o servidor
const socket = io();

// aqui ele irá receber o nome do documento que está sendo editado 
// e passando o nome do documento para o servidor, sendo escutado pelo lado do backend
export function selectDocument(documentName) {
  // socket.emit("select_document", documentName)
  socket.emit("select_document", documentName, (text) => {
    updateEditorText(text)
  })
}

// export function sendEditorText(text, documentName) {
//   // criando o evento, o primeiro parametro é o nome do evento que queremos emitir (pode ser qualquer nome), e o segundo é o valor que queremos passar para o servidor
//   socket.emit("text_input", text, documentName)
// }
export function sendEditorText(data) {
  // criando o evento, o primeiro parametro é o nome do evento que queremos emitir (pode ser qualquer nome), e o segundo é o valor que queremos passar para o servidor
  socket.emit("text_input", data)
}

// func que será chamando quando ouser clicar no botão de excluir e irá emitir um evento
export function sendExcludeDocument(documentName) {
  // emitindo o evento para o servidor
  socket.emit("delete_document", documentName)
}


// socket.on("text_document", (text) => {
//   // e apenas chamamos a func que irá atualizar o html com o valor recebido pelo servidor
//   updateEditorText(text)
// })


// pegando o evento que foi emitido pelo servidor, e emitir para todos os clientes
socket.on("text_input_allClients", (value) => {
  // e apenas chamamos a func que irá atualizar o html com o valor recebido pelo servidor
  updateEditorText(value)
})

// escutando caso um documento seja excluido
socket.on("delete_document_success", (documentName) => {
  alertAndRedirect(documentName)
})
