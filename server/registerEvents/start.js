import { createNewDocument, findDocument, getDocuments } from "../db/documentDb.js"


export default function registerEventsStart(socket, io) {
  socket.on('get_documents', async (returnDocuments) => {
    const documents = await getDocuments()
    // console.log(documents)
    returnDocuments(documents)
  })

  socket.on("new_document", async (documentName) => {

    const existDocument = (await findDocument(documentName) !== null)

    if (!existDocument) {


      const result = await createNewDocument(documentName)

      if (result.acknowledged) {
        // caso o documento tenha sido criado com sucesso, vamos emitir um evento para todos os clientes que estão conectados ao servidor
        // o "io" é o servidor, e o "emit" irá emitir um evento para todos os clientes que estão conectados ao servidor
        io.emit("add_newDocument_interface", documentName)
        // sendo escutado pelo front-end
      }
    } else {
      socket.emit("document_already_exists", documentName)
    }
  })
}
