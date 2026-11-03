import { useRef } from 'react'
import { IMG_URL } from '../services/tmdb'
import { GiTomato } from 'react-icons/gi'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

export default function FileiraFilmes({ titulo, filmes }) {
  const carrosselRef = useRef(null)

  const rolar = (direcao) => {
    carrosselRef.current.scrollBy({
      left: direcao * 700,
      behavior: 'smooth',
    })
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-white text-2xl font-bold mb-4 border-l-4 border-orange-500 pl-3">
        {titulo}
      </h2>

      <div className="relative">
        <button
          onClick={() => rolar(-1)}
          aria-label="Rolar para a esquerda"
          className="absolute left-2 top-[100px] z-10 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-orange-500 transition"
        >
          <IoChevronBack className="text-xl" />
        </button>

        <div
          ref={carrosselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
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

        <button
          onClick={() => rolar(1)}
          aria-label="Rolar para a direita"
          className="absolute right-2 top-[100px] z-10 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-orange-500 transition"
        >
          <IoChevronForward className="text-xl" />
        </button>
      </div>
    </section>
  )
}