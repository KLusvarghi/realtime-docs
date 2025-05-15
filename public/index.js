import { createNewDocument } from "./socket-front-index.js";

const documentList = document.getElementById('document-list');
const form = document.getElementById('form-add-document');
const newDocumentInput = document.getElementById('input-documento');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // emitindo o evento para o servidor
  createNewDocument(newDocumentInput.value)
  // limpando o input
  newDocumentInput.value = '';
})

export function insertLinkDocument(documentName) {
  documentList.innerHTML += `
    <a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action" id="document-${documentName}">
      ${documentName}
    </a>
  `
}

// após remover o docuemntos, temos que tirar ele da tela, e pra isso:
export function removeLinkDocument(documentName) {
  // podendo pegar pelas duas maneiras:
  // const documentLink = document.querySelector(`a[href="documento.html?nome=${documentName}"]`)
  const documentLink = document.getElementById(`document-${documentName}`)
  if (documentLink) {
    documentList.removeChild(documentLink)
  }
}


