import jwt from 'jsonwebtoken';

export default function generateJwt(payload){

  // "sign" é o método do jwt para gerar o token
  // O primeiro parâmetro é o payload, que pode ser um objeto ou uma string (para que não de erro, o payload deve ser um objeto)
  // O segundo parâmetro é a chave secreta usada para assinar o token
  // O terceiro parâmetro é um objeto de opções, onde podemos definir o tempo de expiração do token, entre outras opções
  // O método retorna o token gerado
  const tokenJwt = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h' // Define o tempo de expiração do token para 1 hora
  });

  return jwt
} 
