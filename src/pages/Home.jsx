import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import FileiraFilmes from '../components/FileiraFilmes'
import {
  getEmCartaz,
  getPopulares,
  getMaisBemAvaliados,
  getEmBreve,
  IMG_URL_GRANDE,
} from '../services/tmdb'

export default function Home() {
  const [emCartaz, setEmCartaz] = useState([])
  const [populares, setPopulares] = useState([])
  const [maisBemAvaliados, setMaisBemAvaliados] = useState([])
  const [emBreve, setEmBreve] = useState([])

  useEffect(() => {
    Promise.all([getEmCartaz(), getPopulares(), getMaisBemAvaliados(), getEmBreve()])
      .then(([a, b, c, d]) => {
        setEmCartaz(a)
        setPopulares(b)
        setMaisBemAvaliados(c)
        setEmBreve(d)
      })
      .catch((erro) => console.log(erro.message))
  }, [])

  const destaque = emCartaz.find((f) => f.backdrop_path)

  return (
    <div className="min-h-screen bg-slate-900">
      {destaque && (
        <section
          className="relative h-[420px] md:h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG_URL_GRANDE}${destaque.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a,rgba(15,23,42,0.4))]" />
          <div className="relative max-w-6xl mx-auto h-full flex flex-col justify-end gap-3 px-4 pb-10">
            <span className="text-orange-500 text-sm font-bold tracking-[4px]">EM CARTAZ</span>
            <h1 className="text-white text-[clamp(32px,6vw,64px)] font-black leading-none">
              {destaque.title}
            </h1>
            <p className="text-slate-300 max-w-[600px] line-clamp-3">{destaque.overview}</p>
            <Link
              to="/filmes"
              className="self-start bg-orange-500 text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-orange-500 transition"
            >
              Avaliar filmes
            </Link>
          </div>
        </section>
      )}
      <FileiraFilmes titulo="Em cartaz nos cinemas" filmes={emCartaz} />
      <FileiraFilmes titulo="Mais populares" filmes={populares} />
      <FileiraFilmes titulo="Mais bem avaliados" filmes={maisBemAvaliados} />
      <FileiraFilmes titulo="Em breve" filmes={emBreve} />
    </div>
  )
}