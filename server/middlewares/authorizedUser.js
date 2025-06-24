import jwt from "jsonwebtoken";

function authorizedUser(socket, next) {

  // para recuperar o token no momento que o middleware é executado (antes mesmo da conexão do socket), podemos usar o socket.handshake.auth.token
  // que seria basicamente, quando houver a conexão do socket (handshake), o servidor irá enviar armazenar isso dentro de socket.handshake.auth.token
  // e assim, podemos verificar se o usuário está autenticado ou não, e caso não
  const tokenJwt = socket.handshake.auth.tokenJwt;

  try {
    // esse metodo lança um erro quando o token é inválido ou expirado
    // console.log(tokenJwt)
    jwt.verify(tokenJwt, process.env.JWT_SECRET);
    next();
  } catch (erro) {
    next(erro);
  }
}

export default authorizedUser;
