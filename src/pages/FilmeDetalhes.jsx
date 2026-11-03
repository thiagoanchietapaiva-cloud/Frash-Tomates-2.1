import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { detalheFilme } from '../services/tmdb'
import AvaliacaoTomates from '../components/AvaliacaoTomates'
export default function FilmeDetalhes() {
  const { id } = useParams()
  const [filme, setFilme] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function carregar() {
      const dados = await detalheFilme(id)
      setFilme(dados)
      setLoading(false)
    }
    carregar()
  }, [id])
  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Carregando...</div>
  if (!filme) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Filme não encontrado</div>
  return (
    <div className="min-h-screen bg-slate-900">
        
      <div 
        className="h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto flex gap-8 items-end">
          <img 
            src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} 
            className="w-48 rounded-2xl border-2 border-slate-700 hidden md:block"
          />
          <div>
            <h1 className="text-white text-5xl font-black">{filme.title}</h1>
            <p className="text-slate-300 mt-2">{filme.release_date?.slice(0,4)} • {filme.runtime} min • {filme.vote_average?.toFixed(1)} ⭐</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-slate-300 text-lg leading-relaxed mb-8">{filme.overview}</p>
        <AvaliacaoTomates filmeId={filme.id} />
      </div>
    </div>
  )
}