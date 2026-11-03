import { GiTomato } from 'react-icons/gi'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
export default function Navbar() {
  const { usuario, logout, logado } = useAuth()
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-white text-[28px] font-black">
          fresh<span className="text-orange-500 text-5xl inline-flex items-center gap-1">Tomates<GiTomato className="text-5xl" /></span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link to="/filmes" className="text-slate-300 text-2xl hover:text-white transition">Filmes</Link>
          {logado ? (
            <>
              <span className="text-slate-300 text-xl">Olá, {usuario.nome}</span>
              <button
                onClick={logout}
                className="text-2xl text-orange-500 hover:text-white transition"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-2xl text-orange-500 hover:text-white transition">Entrar</Link>
              <Link
                to="/cadastro"
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-orange-500 transition"
              >
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}