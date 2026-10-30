import { IMG_URL } from '../services/tmdb'
import { GiTomato } from 'react-icons/gi'

export default function FileiraFilmes({ titulo, filmes }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-white text-2xl font-bold mb-4 border-l-4 border-orange-500 pl-3">
        {titulo}
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {filmes
          .filter((f) => f.poster_path)
          .map((f) => (
            <div key={f.id} className="w-[160px] shrink-0">
              <img
                src={`${IMG_URL}${f.poster_path}`}
                alt={f.title}
                className="w-full h-[240px] object-cover rounded-lg"
              />
              {f.vote_average > 0 && (
                <p className="text-orange-500 text-sm font-bold mt-2 flex items-center gap-1">
                  <GiTomato className="text-lg" /> {Math.round(f.vote_average * 10)}%
                </p>
              )}
              <h3 className="text-white text-sm font-semibold truncate">{f.title}</h3>
            </div>
          ))}
      </div>
    </section>
  )
}