import { createNewDocument } from "./socket-front-index.js";
import { getCookie, removeCookie } from "./utils/cookies.js";

const tokenJwt = getCookie("tokenJwt");
if (!tokenJwt) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "/login/index.html";
}

const documentList = document.getElementById('document-list');
const form = document.getElementById('form-add-document');
const newDocumentInput = document.getElementById('input-documento');
const logoutBUutton = document.getElementById('button-logout');

logoutBUutton.addEventListener('click', () => {
  removeCookie("tokenJwt"); // remove o cookie do token JWT
  alert("Você foi deslogado com sucesso!");
  window.location.href = "/login/index.html"; // redireciona para a página de
})

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // emitindo o evento para o servidor
  createNewDocument(newDocumentInput.value)
  // limpando o input
  newDocumentInput.value = '';
})

export function insertLinkDocument(documentName) {
  documentList.innerHTML += `
    <a href="/documents/index.html?nome=${documentName}" class="list-group-item list-group-item-action" id="document-${documentName}">
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


