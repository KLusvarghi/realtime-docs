import { scryptSync, timingSafeEqual } from "crypto";

export const authenticationUser = async (password, user) => {

  // send o 64 o tamaneho da hash que já utilizamso
  const hashTest = scryptSync(password, user.saltPassword, 64)

  // e para comparar as duas, precisamos que ambas sejam buffers
  const hashReal = Buffer.from(user.hashPassword, 'hex') // o 'hex' significa que a string está em formato hexadecimal e queremos ela em buffer
  const authenticated = timingSafeEqual(hashTest, hashReal)

  return authenticated
}
