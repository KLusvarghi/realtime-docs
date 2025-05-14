import io from "./server.js"


const documents = [
  {
    name: "JavaScript",
    text: "texto de javascript...",
  },
  {
    name: "Node",
    text: "texto de node...",
  },
  {
    name: "Socket.io",
    text: "texto de socket.io...",
  },
]


// o metodo "on" do socket.io escuta as conexões que estão chegando

// e quando uma conexão é feita, ele executa a função que está dentro do "on"'
io.on("connection", (socket) => {
  console.log("Nova conexão! Id: ", socket.id)


  // iremos escurtar o evento, recebendo o nome do documento a ser editado
  // recebendo como parametro o nome do envento, o nome do documento e uma func que irá retornar o texto do documento, sendo  o "returnText" o callback que será chamado quando o servidor receber o evento
  socket.on("select_document", (documentName, returnText) => {
    // o "join" irá pegar o cliente que estpa conectado a esse socket e colocar em uma sala com o nome do documento.
    // Então, sempre que uma pessoa entrar no documento de JavaScript, por exemplo, estará entrando numa sala do Socket.IO chamada JavaScript.
    socket.join(documentName)


    const document = findDocument(documentName)
    if (document) {
      // emitindo apenas para o cliente que está editando o documento
      // socket.emit("text_document", document.text)

      // outra maneira de atualizar os dados é como recebemos um "returnText" que é um func, e passamos apenas o nome do cocumento e na chamanda dele ele mesmo já atualiza
      returnText(document.text)
    }
  })

  // pegando o evento que foi emitido pelo cliente
  // com "socket.on" ele irá escutar o evento que foi emitido pelo cliente (de todos conectados ao servidor)
  // o primeiro valor é o nome do evento, e o segundo neste caso é um objeto que contém o texto e o nome do documento e apenas desestruturamos ele
  socket.on("text_input", ({ text, documentName }) => {

    // salvando o texto do documento localmente, apenas alterando o valor do objeto
    const document = findDocument(documentName)
    if (document) {
      document.text = text


      // e para que a gente emita essa valor para todos os clientes que estão conectados ao servidor menos para o cliente que está digitando, ao invés de usar "io.emit" , vamos usar "socket.broadcast.emit"
      // socket.broadcast.emit("text_input_allClients", text)

      // o "to" irá emitir o evento para todos os clientes que estão na sala do documento, ou seja, apenas para os clientes que estão editando o mesmo documento
      // Vale ressaltar que todos esses códigos acontecem apenas do lado do back-end. As salas do Socket.IO são uma funcionalidade apenas do servidor, e no lado do front-end não há como saber quais clientes estão em quais salas.
      socket.to(documentName).emit("text_input_allClients", text)
    }
  })

})


function findDocument(name) {
  const document = documents.find((doc) => doc.name === name)
  console.log("document", document)
  return document
}
