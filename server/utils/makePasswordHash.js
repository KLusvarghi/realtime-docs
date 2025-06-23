import { randomBytes, scryptSync } from "crypto";

export function makePasswordHash(password) {
  // o primeiro parametro é o tamanho em bytes (16 bytes) e ele nos retornar um buffer do javascript, e temos que converter isso para string
  // apenas com toString("hex") -> dizewmos que será cnvertida em hexadecimal
  const saltPassword = randomBytes(16).toString("hex")

  // sendo o 64 o tamanho da hash
  const hashPassword = scryptSync(password, saltPassword, 64).toString("hex")
  return {saltPassword, hashPassword}
}