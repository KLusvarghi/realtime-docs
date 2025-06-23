import { defineCookie } from "../utils/cookies.js";

const socket = io()

export const sendLoginUser = ({ username, password }) => {
  socket.emit("auth_user", { username, password })
}

socket.on("success_login", (tokenJwt) => {
  defineCookie("tokenJwt", tokenJwt) // define o cookie com o token JWT por 7 dias

  alert("Usuário autenticação com sucesso")
  window.location.href = "/"
});
socket.on("error_login", () => alert("Error na autenticação do usuário"));
socket.on("user_does_not_exist", () => alert("Usário não existe!"));
