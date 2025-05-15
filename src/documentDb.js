import { documentsCollection } from "./config/dbConnect.js"

export function findDocument(name) {
  // usando o metodo do mongo para encontrar o documento, e como o nome da propriedade é igual ao nome da variavel, podemos usar apenas o nome da variavel
  return documentsCollection.findOne({ name })
}

export function updateDocument(name, text) {

  // outro metodo do mongo para atualizar o documento, e como o nome da propriedade é igual ao nome da variavel, podemos usar apenas o nome da variavel
  return documentsCollection.updateOne(
    // passando o nome do documento que queremos atualizar (podendo usar outras props para verificar se o documento existe)
    {
      name
    },
    {
      // usamos esse operador para atualizar o documento, e o valor que queremos atualizar
      $set: {
        // no caso queremos atualizar o texto do documento que tem a chave "text", e como o valor é o mesmo nome da variavel, podemos usar apenas o nome da variavel
        text
      }
    })
}

export async function getDocuments(){

  // esse metodo "find" do mongo retorna todos os documentos que estão na collection, e o "toArray" transforma o resultado em um array
  const documents = await documentsCollection.find().toArray()
  return documents
}
