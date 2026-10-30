import { Link } from 'react-router'

export default function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-white text-[28px] font-black">
          fresh<span className="text-orange-500">Tomates</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link to="/filmes" className="text-slate-300 hover:text-white transition">Filmes</Link>
          <Link to="/login" className="text-slate-300 hover:text-white transition">Entrar</Link>
          <Link
            to="/cadastro"
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-orange-500 transition"
          >
            Cadastrar
          </Link>
        </nav>
      </div>
    </header>
  )
}