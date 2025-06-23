import "dotenv/config.js"

import registerEventsDocument from "./registerEvents/document.js"
import { registerEventLogin } from "./registerEvents/login.js"
import { registerEventRegister } from "./registerEvents/register.js"
import registerEventsStart from "./registerEvents/start.js"
import io from "./server.js"


// o metodo "on" do socket.io escuta as conexões que estão chegando

// e quando uma conexão é feita, ele executa a função que está dentro do "on"'
io.on("connection", (socket) => {
  // console.log("Nova conexão! Id: ", socket.id)

  registerEventsStart(socket, io)
  registerEventLogin(socket, io)
  registerEventRegister(socket, io)
  registerEventsDocument(socket, io)
})


