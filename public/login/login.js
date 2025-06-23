import { sendLoginUser } from "./socket-front-login.js"

const form = document.getElementById("form-login")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // como os inputs são "prorpiedades" do form, podemos acessá-los diretamente
  const username = form["input-user"].value
  const password = form["input-password"].value

  sendLoginUser({ username, password })
})
