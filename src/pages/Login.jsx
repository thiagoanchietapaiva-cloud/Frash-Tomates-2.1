import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { GiTomato } from 'react-icons/gi'
import { login as loginApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { salvarUsuario } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const res = await loginApi(email, senha)

      if (res.tipo === 'success') {
        salvarUsuario(res.usuario)
        navigate('/')
      } else {
        setErro(res.mensagem || 'Email ou senha inválidos')
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <GiTomato className="text-orange-500 text-5xl mb-2" />
          <h1 className="text-white text-2xl font-black">
            fresh<span className="text-orange-500">Tomates</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Entre para avaliar filmes</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />

          {erro && (
            <p className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2 rounded-lg">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-white hover:text-orange-500 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-slate-400 text-sm text-center mt-6">
          Não tem conta?{' '}
          <Link to="/cadastro" className="text-orange-500 font-semibold hover:text-white">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}