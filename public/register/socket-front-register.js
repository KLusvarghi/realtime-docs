const socket = io()

export function sendRegisterUser(data) {
  socket.emit("register_user", data) // emitindo no front um evento para cadastrar usuário

  // socket.on("registerUserResponse", (response) => {
  //   console.log(response)
  //   if (response.status === "success") {
  //     alert("User registered successfully!")
  //   } else {
  //     alert("Error registering user: " + response.message)
  //   }
  // })
  // socket.on("registerUserError", (error) => {
  //   console.error("Error registering user:", error)
  //   alert("Error registering user: " + error.message)
  // })
} 

socket.on("success_register", () => alert("Cadastro realizado com sucesso!"));
socket.on("error_register", () => alert("Erro no cadastro."));
socket.on("user_already_exists", () => alert("Usuário já existe!"));
