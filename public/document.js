// esse arquivo é responsavel apenas por pegar o valor do input e chamar uma func que irá emitir o evento para o servidor passando os valores
import { selectDocument, sendEditorText, sendExcludeDocument } from "./socket-front-doc.js"

// pegando os parametros da url
const params = new URLSearchParams(window.location.search)
const documentName = params.get("nome")

// pegando o valor do input
const textInput = document.getElementById("editor-texto")
const documentTitle = document.getElementById("titulo-documento")
const excludeButton = document.getElementById("excluir-documento")

// pegando o valor do input e colocando no title
documentTitle.textContent = documentName || "Documento sem título"

// passando o nome do documento para o arquivo que irá emitir o evento para o servidor
selectDocument(documentName)

// pegando o evento de "keyup" (toda vez que soltar uma tecla)
textInput.addEventListener("keyup", () => {
  // Chamando a func que irá "emitir" o evento para o servidor
  sendEditorText({
    text: textInput.value,
    documentName
  })
})

// ao clicar em excluir document, ele emit um evento para o servidor
excludeButton.addEventListener("click", () => {
  sendExcludeDocument(documentName)
})

export function updateEditorText(text) {
  textInput.value = text
}

export function alertAndRedirect(name){
  if(documentName !== name) return
  alert(`O documento ${name} foi excluido com sucesso!`)
  window.location.href = "/"
}
