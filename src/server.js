import express from 'express'

// para que possamos servir os arquivos da pasta "public" que contem as páginas html, temos que importar o url e path que é do módulo nativo do node
import url from 'url'
import path from 'path'

// precios importar o http para que possamos criar o servidor
import http from 'http'

import { Server } from 'socket.io'

const app = express()
const PORT = process.env.PORT || 3000;

// pegando o caminho do arquivo atual
const currentPath = url.fileURLToPath(import.meta.url)

// pegando o caminho do diretório public que contem as páginas html que queremos servir
const publicDir = path.join(currentPath, "../..", "public")

// servindo os arquivos que estão dentro da pasta "public" de forma estática usando o ".static"
app.use(express.static(publicDir)) // e com isso instanciando mais um middleware

// criando um servidor, passando o app como parâmetro que é o express
// e o httpServer vai ser o servidor que vai escutar as requisições
const httpServrer = http.createServer(app)


httpServrer.listen(PORT, () => console.log("Servidor rodando na porta", PORT))


// criando o servidor de socket.io
// assim, com essa variável "io" poderemos acessar os métodos do socket.io
const io = new Server(httpServrer)

export default io

