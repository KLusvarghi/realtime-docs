import { findDocument, updateDocument } from "./documentDb.js"
import io from "./server.js"


// o metodo "on" do socket.io escuta as conexões que estão chegando

// e quando uma conexão é feita, ele executa a função que está dentro do "on"'
io.on("connection", (socket) => {
  console.log("Nova conexão! Id: ", socket.id)


  // iremos escurtar o ecento, recebendo o nome do documento a ser editado
  socket.on("select_document", async (documentName, returnText) => {
    // o "join" irá pegar o cliente que estpa conectado a esse socket e colocar em uma sala com o nome do documento.
    // Então, sempre que uma pessoa entrar no documento de JavaScript, por exemplo, estará entrando numa sala do Socket.IO chamada JavaScript.
    socket.join(documentName)


    const document = await findDocument(documentName)
    console.log(document)
    if (document) {
      // emitindo apenas para o cliente que está editando o documento
      // socket.emit("text_document", document.text)

      // outra maneira de atualizar os dados é como recebemos um "returnText" que é um func, e passamos apenas o nome do cocumento e na chamanda dele ele mesmo já atualiza
      returnText(document.text)
    }
  })

  // pegando o evento que foi emitido pelo cliente
  // com "socket.on" ele irá escutar o evento que foi emitido pelo cliente (de todos conectados ao servidor)
  // o primeiro valor é o nome do evento, e o segundo é a função que será executada quando o evento for emitido, e nessa função podemos receber por parametro o valor que foi emitido pelo cliente (caso ele tenha passado algum valor)
  socket.on("text_input", async ({ text, documentName }) => {

    // salvando o texto do documento localmente, apenas alterando o valor do objeto
    const updated = await updateDocument(documentName, text)

    // a prorpiedade "modifiedCount" retorna o número de documentos que foram alterados, e se for maior que 0, significa que o documento foi atualizado
    if (updated.modifiedCount > 0) {

      // e para que a gente emita essa valor para todos os clientes que estão conectados ao servidor menos para o cliente que está digitando, ao invés de usar "io.emit" , vamos usar "socket.broadcast.emit"
      // socket.broadcast.emit("text_input_allClients", text)

      // o "to" irá emitir o evento para todos os clientes que estão na sala do documento, ou seja, apenas para os clientes que estão editando o mesmo documento
      // Vale ressaltar que todos esses códigos acontecem apenas do lado do back-end. As salas do Socket.IO são uma funcionalidade apenas do servidor, e no lado do front-end não há como saber quais clientes estão em quais salas.
      socket.to(documentName).emit("text_input_allClients", text)
    }
  })

})


