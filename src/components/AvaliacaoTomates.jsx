import { useState, useEffect } from 'react'
import { GiTomato } from 'react-icons/gi'
import { useAuth } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function AvaliacaoTomates({ filmeId }) {
  const { usuario, logado } = useAuth()
  const [nota, setNota] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState('')
  const [avaliacoes, setAvaliacoes] = useState([])
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/avaliacoes/${filmeId}`)
      .then(r => r.json())
      .then(setAvaliacoes)
      .catch(() => {})
  }, [filmeId])

  const enviar = async () => {
    if (!logado) return alert('Faça login para avaliar')
    if (nota === 0) return alert('Escolha uma nota de 1 a 5 tomates')
    
    setEnviando(true)
    try {
      const res = await fetch(`${API_URL}/avaliacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          filme_id: filmeId,
          nota,
          comentario
        })
      })
      const data = await res.json()
      if (data.tipo === 'success' || data.avaliacao) {

        const lista = await fetch(`${API_URL}/avaliacoes/${filmeId}`).then(r => r.json())
        setAvaliacoes(lista)
        setComentario('')
        alert('Avaliação salva!')
      }
    } catch (e) {
      alert('Erro ao salvar: ' + e.message)
    } finally {
      setEnviando(false)
    }
  }

  const media = avaliacoes.length > 0 
    ? (avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length).toFixed(1)
    : null

  return (
    <div className="bg-slate-800 rounded-2xl p-6 mt-8 border border-slate-700">
      <h3 className="text-white text-2xl font-black mb-4 flex items-center gap-2">
        Avaliação <span className="text-orange-500 flex"><GiTomato /> Tomates</span>
        {media && <span className="text-slate-400 text-lg ml-2">Média: {media} / 5</span>}
      </h3>

      {logado ? (
        <div className="mb-6">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map((n) => (
              <button
                key={n}
                onClick={() => setNota(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                className="transition transform hover:scale-110"
              >
                <GiTomato
                  className={`text-4xl ${
                    n <= (hover || nota) ? 'text-orange-500' : 'text-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="O que achou do filme? (opcional)"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-orange-500"
            rows={3}
          />

          <button
            onClick={enviar}
            disabled={enviando}
            className="mt-3 bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-orange-500 transition disabled:opacity-50"
          >
            {enviando ? 'Salvando...' : 'Salvar Avaliação'}
          </button>
        </div>
      ) : (
        <p className="text-slate-400 text-sm mb-6">Faça login para avaliar com tomates</p>
      )}

      <div className="space-y-3">
        {avaliacoes.length === 0 ? (
          <p className="text-slate-500 text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>
        ) : (
          avaliacoes.map((av) => (
            <div key={av.id} className="bg-slate-900 rounded-xl p-3 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm">{av.nome}</span>
                <div className="flex">
                  {Array.from({ length: av.nota }).map((_, i) => (
                    <GiTomato key={i} className="text-orange-500 text-lg" />
                  ))}
                </div>
              </div>
              {av.comentario && (
                <p className="text-slate-300 text-sm mt-2">{av.comentario}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}