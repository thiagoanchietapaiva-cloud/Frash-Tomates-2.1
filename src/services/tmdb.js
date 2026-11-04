const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY
export const IMG_URL = 'https://image.tmdb.org/t/p/w500'
export const IMG_URL_GRANDE = 'https://image.tmdb.org/t/p/original'
async function buscar(caminho, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, language: 'pt-BR', ...params })
  const resposta = await fetch(`${BASE_URL}${caminho}?${query}`)
  if (!resposta.ok) throw new Error('Erro ao buscar filmes')
  const dados = await resposta.json()
  return dados.results || dados
}
export const buscarFilmes = (nome) => buscar('/search/movie', { query: nome })
export const filmesPopulares = () => buscar('/movie/popular')

export const detalheFilme = async (id) => {
  const query = new URLSearchParams({ 
    api_key: API_KEY, 
    language: 'pt-BR',
    append_to_response: 'videos,credits' 
  })
  const res = await fetch(`${BASE_URL}/movie/${id}?${query}`)
  if (!res.ok) throw new Error('Filme não encontrado')
  return await res.json()
}
export const getFilmeCompleto = detalheFilme
export const getPopulares = filmesPopulares
export const getEmCartaz = () => buscar('/movie/now_playing', { region: 'BR' })
export const getMaisBemAvaliados = () => buscar('/movie/top_rated')
export const getEmBreve = () => buscar('/movie/upcoming', { region: 'BR' })
export const getTrailer = (filme) => {
  if (!filme?.videos?.results?.length) return null
  const trailer = filme.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  return trailer || filme.videos.results[0]
}