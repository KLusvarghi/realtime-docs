import "dotenv/config.js"

import registerEventsDocument from "./registerEvents/document.js"
import { registerEventLogin } from "./registerEvents/login.js"
import { registerEventRegister } from "./registerEvents/register.js"
import registerEventsStart from "./registerEvents/start.js"

import io from "./server.js"
import authorizedUser from "./middlewares/authorizedUser.js";


// nessse "io" é o servidor que foi criado no arquivo server.js
// E vamos implementar um middlware para que ele verifique se o client tem permissão para registar o meu servidor

// sendo o socket, o primeiro parametro é o socket que está se conectando ao servidor, e o segundo é a função que será executada quando o socket se conectar ao servidor
// o "next" é uma função que deve ser chamada para continuar o fluxo do middleware,
// caso não seja chamada, o socket não será conectado ao servidor
// E se quisermos bloquear a conexão, podemos chamar o "next" passando um erro como parâmetro, por exemplo: next(new Error("Unauthorized"))
// lembrando que um middleware é uma função que é executada antes da conexão do client e do server ser estabelecida, é algo que acontece primeiro e tem que ser bem rápido (nnão podendo executar ações que cause muita latencia), e pode ser usado para verificar se o usuário tem permissão para acessar o recurso ou não


// instanciando o namespace "/users" para que possamos registrar os eventos que serão usados nesse namespace
const nspUsers = io.of("/users");

// como queremos que esse middlware seja executado apenas para algumas páginas, vamos usar um conceito chamado "namespaces"
nspUsers.use(authorizedUser)

nspUsers.on("connection", (socket) => {
  // aqui estamos usando o middleware de autorização para o namespace "/users"
  // e com isso registramaos os eventos que serão usados nesse namespace
  registerEventsStart(socket, nspUsers)
  registerEventsDocument(socket, nspUsers)
});

// o metodo "on" do socket.io escuta as conexões que estão chegando
// e quando uma conexão é feita, ele executa a função que está dentro do "on"'
io.of("/").on("connection", (socket) => { // namespace principal "/"
  // console.log("Nova conexão! Id: ", socket.id)
  
  registerEventLogin(socket, io)
  registerEventRegister(socket, io)
})


