import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { cadastrar as cadastrarApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { salvarUsuario } = useAuth()
  const navigate = useNavigate()
  const handleCadastro = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const res = await cadastrarApi(nome, email, senha)
      if (res.tipo === 'success') {
        salvarUsuario(res.usuario)
        navigate('/')
      } else {
        setErro(res.mensagem)
      }
    } catch {
      setErro('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl p-8">
        <h1 className="text-white text-2xl font-black text-center mb-6">
          fresh<span className="text-orange-500">Tomates</span>
        </h1>
        <form onSubmit={handleCadastro} className="flex flex-col gap-4">
          <input type="text" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} required className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)} required className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white" />
          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          <button type="submit" disabled={loading} className="bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-white hover:text-orange-500 transition">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className="text-slate-400 text-sm text-center mt-6">
          Já tem conta? <Link to="/login" className="text-orange-500 font-semibold">Entrar</Link>
        </p>
      </div>
    </div>
  )
}