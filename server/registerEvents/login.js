import { findUser } from "../db/usersDb.js";
import { authenticationUser } from "../utils/authenticatorUser.js";
import generateJwt from "../utils/generateJwt.js";

export function registerEventLogin(socket, io) {
  socket.on("auth_user", async ({username, password}) => { // escutando o evento para cadastrar usuário
    const user = await findUser(username)
    if (user) {
      const auth = await authenticationUser(password, user) // função para validar usuário
      if (auth) {
        const tokenJwt = generateJwt({username: user.username}) // como o username é um valor único, podemos usar ele para gerar o token
        socket.emit("success_login", tokenJwt)
      } else {
        socket.emit("error_login")
      }
    } else {
      socket.emit("user_does_not_exist")
    }
  })
}
