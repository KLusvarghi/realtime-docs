import "./socket-front-index.js"

const documentList = document.getElementById('document-list');

// const form = document.getElementById('.form-adiciona-documento"');

console.log(documentList)

export function insertLinkDocument(documentName) {
  documentList.innerHTML += `
    <a href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action">
      ${documentName}
    </a>
  `
}


