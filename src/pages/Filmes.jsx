import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { buscarFilmes, filmesPopulares } from '../services/tmdb'
import { IoArrowBack, IoHome } from 'react-icons/io5'

export default function Filmes() {
  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function carregar() {
      setLoading(true)
      const lista = await filmesPopulares()
      setFilmes(lista)
      setLoading(false)
    }
    carregar()
  }, [])
  const pesquisar = async (e) => {
    e.preventDefault()
    if (!busca.trim()) return
    setLoading(true)
    const resultado = await buscarFilmes(busca)
    setFilmes(resultado)
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <Link 
  to="/" 
  className="inline-flex items-center gap-2 text-xl text-white px-10 font-bold hover:text-amber-500 mb-6"
>
  <IoHome className="text-xl" />
  Home
</Link>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-black mb-6">
          Filmes <span className="text-orange-500">freshTomates</span>
        </h1>
        <form onSubmit={pesquisar} className="flex gap-2 mb-8">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar filme..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-orange-500 transition">
            Buscar
          </button>
        </form>
        {loading ? (
          <p className="text-slate-400">Carregando...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filmes.map((filme) => (
              <Link
                key={filme.id}
                to={`/filme/${filme.id}`}
                className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-orange-500 transition hover:scale-105"
              >
                <img
                  src={filme.poster_path ? `https://image.tmdb.org/t/p/w300${filme.poster_path}` : '/no-image.png'}
                  alt={filme.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-white font-bold text-sm line-clamp-2">{filme.title}</h3>
                  <p className="text-slate-400 text-xs mt-1">{filme.release_date?.slice(0, 4)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}