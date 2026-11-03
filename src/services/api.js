const BASE_API = import.meta.env.VITE_API_URL || 'http://localhost:3000'
async function request(caminho, metodo = 'GET', body = null) {
  const res = await fetch(`${BASE_API}${caminho}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null
  })
  const data = await res.json().catch(()=> ({}))
  if(!res.ok){
    throw data
  }
  return data
}
export const login = (email, senha) => request('/login', 'POST', { email, senha })
export const cadastrar = (nome, email, senha) => request('/usuarios', 'POST', { nome, email, senha })
export const listarUsuarios = () => request('/usuarios', 'GET')