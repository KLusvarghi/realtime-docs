import { sendRegisterUser } from "./socket-front-register.js"

const form = document.getElementById("form-register")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // como os inputs são "prorpiedades" do form, podemos acessá-los diretamente
  const username = form["input-user"].value
  const password = form["input-password"].value

  sendRegisterUser({ username, password })
})
