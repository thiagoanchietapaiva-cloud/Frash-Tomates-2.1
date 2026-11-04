import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { GiTomato } from 'react-icons/gi'
import { IoPlay } from 'react-icons/io5'
import { detalheFilme, getTrailer, IMG_URL, IMG_URL_GRANDE } from '../services/tmdb'
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
  const trailer = getTrailer(filme)
  const diretor = filme.credits?.crew?.find(c => c.job === 'Director')
  const elenco = filme.credits?.cast?.slice(0, 8) || []
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="h-[70vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${IMG_URL_GRANDE}${filme.backdrop_path})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto flex gap-8 items-end">
          <img src={`${IMG_URL}${filme.poster_path}`} className="w-48 rounded-2xl border-2 border-slate-700 hidden md:block shadow-2xl" alt={filme.title} />
          <div>
            <h1 className="text-white text-5xl font-black">{filme.title}</h1>
            <p className="text-slate-300 mt-2 flex items-center gap-2">{filme.release_date?.slice(0,4)} • {filme.runtime} min • <span className="flex items-center gap-1 text-orange-500 font-bold"><GiTomato /> {Math.round(filme.vote_average * 10)}%</span></p>
            {filme.genres && <p className="text-slate-400 text-sm mt-2">{filme.genres.map(g => g.name).join(' • ')}</p>}
            {diretor && <p className="text-slate-300 text-sm mt-1">Direção: <span className="text-orange-500 font-bold">{diretor.name}</span></p>}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-10">
          <div><h2 className="text-white text-2xl font-bold mb-3 border-l-4 border-orange-500 pl-3">Sinopse</h2><p className="text-slate-300 text-lg leading-relaxed">{filme.overview}</p></div>
          {trailer && <div><h2 className="text-white text-2xl font-bold mb-3 border-l-4 border-orange-500 pl-3 flex items-center gap-2"><IoPlay /> Trailer</h2><div className="aspect-video rounded-2xl overflow-hidden bg-black border border-slate-700"><iframe className="w-full h-full" src={`https://www.youtube.com/embed/${trailer.key}`} allowFullScreen /></div></div>}
          {elenco.length > 0 && <div><h2 className="text-white text-2xl font-bold mb-4 border-l-4 border-orange-500 pl-3">Elenco</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{elenco.map(ator => <div key={ator.id} className="bg-slate-800 rounded-xl p-3 border border-slate-700"><img src={ator.profile_path ? `${IMG_URL}${ator.profile_path}` : 'https://via.placeholder.com/185x278?text=Sem+Foto'} alt={ator.name} className="w-full h-32 object-cover rounded-lg mb-2" /><p className="text-white text-sm font-bold truncate">{ator.name}</p><p className="text-slate-400 text-xs truncate">{ator.character}</p></div>)}</div></div>}
        </div>
        <div className="lg:sticky lg:top-24 h-fit"><AvaliacaoTomates filmeId={filme.id} /></div>
      </div>
    </div>
  )
}