import { Link } from 'react-router'
import { GiTomato } from 'react-icons/gi'
export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="text-white text-2xl font-black flex items-center gap-1">fresh<span className="text-orange-500 flex items-center gap-1">Tomates<GiTomato /></span></Link>
          <p className="text-slate-400 text-sm mt-3">Avalie com tomates, não com estrelas.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Navegação</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="text-slate-400 hover:text-orange-500">Home</Link>
            <Link to="/filmes" className="text-slate-400 hover:text-orange-500">Filmes</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}