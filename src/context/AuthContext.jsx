import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('freshTomates_user')
    return salvo ? JSON.parse(salvo) : null
  })

  const salvarUsuario = (user) => {
    localStorage.setItem('freshTomates_user', JSON.stringify(user))
    setUsuario(user)
  }

  const logout = () => {
    localStorage.removeItem('freshTomates_user')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, salvarUsuario, logout, logado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)