export function defineCookie(key, value) {
  // todo cookie tem que ter chave, valor, caminho, tempo de expiração, SameSite e Secure
  document.cookie = `${key}=${value};path=/`;
}


export function getCookie(key) {
  // todo cookie tem que ter chave, valor, caminho, tempo de expiração, SameSite e Secure
  // ["cookie1=valor1", "cookie2=valor2", "cookie3=valor3"]
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.split("=")[1];
}

export function removeCookie(key) {
  // assim, expiramos o cookie, definindo uma data de expiração no passado
  // e definindo o caminho, SameSite e Secure
  // Isso é importante para garantir que o cookie seja removido corretamente
  // e não seja enviado em requisições futuras.
  // O SameSite=Lax é uma configuração de segurança que ajuda a prevenir CSRF (Cross-Site Request Forgery)
  // O Secure garante que o cookie só seja enviado por conexões seguras (HTTPS)
  // O caminho é definido como / para que o cookie esteja disponível
  // return document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00`;

}
export function removeAllCookies() {
  // para remover todos os cookies, podemos usar o método Object.keys() para obter todas as chaves dos cookies
  // e em seguida, usar o método forEach() para remover cada cookie individualmente
  document.cookie.split(";").forEach((cookie) => {
    const key = cookie.split("=")[0].trim();
    removeCookie(key);
  });
}
