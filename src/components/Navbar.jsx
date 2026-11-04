import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { GiTomato } from 'react-icons/gi'
import { IoMenu, IoClose, IoHome } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'
export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const sair = () => {
    logout()
    setAberto(false)
    navigate('/')
  }
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-xl md:text-2xl font-black flex items-center gap-1 shrink-0" onClick={() => setAberto(false)}>
          fresh<span className="text-orange-500 flex items-center gap-1">Tomates<GiTomato /></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-500 transition">
            <IoHome /> Home
          </Link>
          <Link to="/filmes" className="text-slate-300 text-sm font-bold hover:text-white">Filmes</Link>
          {!usuario ? (
            <>
              <Link to="/login" className="text-orange-500 text-sm font-bold">Entrar</Link>
              <Link to="/cadastro" className="bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-full">Cadastrar</Link>
            </>
          ) : (
            <>
              <span className="text-slate-400 text-sm">Olá, {usuario.nome}</span>
              <button onClick={sair} className="text-slate-300 text-sm font-bold hover:text-white">Sair</button>
            </>
          )}
        </nav>
        <button className="md:hidden bg-slate-800 p-2 rounded-full text-white" onClick={() => setAberto(!aberto)}>
          {aberto ? <IoClose className="text-2xl" /> : <IoMenu className="text-2xl" />}
        </button>
      </div>
      {aberto && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 flex flex-col gap-4">
          <Link to="/" className="text-white font-bold flex items-center gap-2" onClick={() => setAberto(false)}><IoHome /> Home</Link>
          <Link to="/filmes" className="text-slate-300 font-bold" onClick={() => setAberto(false)}>Filmes</Link>
          {!usuario ? (
            <>
              <Link to="/login" className="text-orange-500 font-bold" onClick={() => setAberto(false)}>Entrar</Link>
              <Link to="/cadastro" className="bg-orange-500 text-white font-bold px-5 py-2 rounded-full text-center" onClick={() => setAberto(false)}>Cadastrar</Link>
            </>
          ) : (
            <>
              <span className="text-slate-400">Olá, {usuario.nome}</span>
              <button onClick={sair} className="text-left text-slate-300 font-bold">Sair</button>
            </>
          )}
        </div>
      )}
    </header>
  )
}