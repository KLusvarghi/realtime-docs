import { registerUser } from "../db/usersDb.js";
import { findUser } from "../db/usersDb.js";

export function registerEventRegister(socket, io) {
  socket.on("register_user", async (data) => { // escutando o evento para cadastrar usuário

    const user = await findUser(data.username)

    if (user === null) {
      const result = await registerUser(data) // e chamando a função que irá cadastrar o usuário
      if (result.acknowledged) {
        socket.emit("success_register")
      } else {
        socket.emit("error_register")
      }
    } else {
      socket.emit("user_already_exists")
    }




    // try {
    //   const { username, password } = data;
    //   // Perform registration logic here
    //   // For example, save the user to a database
    //   console.log("Registering user:", username);
    //   // Simulate successful registration
    //   const response = { status: "success", message: "User registered successfully!" };
    //   socket.emit("registerUserResponse", response);
    // } catch (error) {
    //   console.error("Error registering user:", error);
    //   socket.emit("registerUserError", { status: "error", message: error.message });
    // }
  });
}