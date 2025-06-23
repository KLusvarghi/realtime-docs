import { usersCollection } from "./dbConnect.js"
import { makePasswordHash } from "../utils/makePasswordHash.js"


// função para registar
export function registerUser({ username, password }) {

  const {hashPassword, saltPassword} = makePasswordHash(password)

  return usersCollection.insertOne({
    username,
    hashPassword, 
    saltPassword
  })

}// função para validar usuário
export function authenticationUser({ username, password }) {

  const {hashPassword, saltPassword} = makePasswordHash(password)

  return usersCollection.insertOne({
    username,
    hashPassword, 
    saltPassword
  })

}

// função para achar um registro
export function findUser(username) {
  return usersCollection.findOne({ username })
}