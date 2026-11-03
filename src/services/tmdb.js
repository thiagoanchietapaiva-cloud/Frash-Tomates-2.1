const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_URL = 'https://image.tmdb.org/t/p/w500'
export const IMG_URL_GRANDE = 'https://image.tmdb.org/t/p/original'
async function buscar(caminho, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, language: 'pt-BR', ...params })
  const res = await fetch(`${BASE_URL}${caminho}?${query}`)
  if (!res.ok) throw new Error('Erro ao buscar filmes')
  const dados = await res.json()
  return dados.results || dados
}
export const filmesPopulares = () => buscar('/movie/popular')
export const buscarFilmes = (query) => buscar('/search/movie', { query })
export const detalheFilme = (id) => buscar(`/movie/${id}`)
export const getPopulares = () => buscar('/movie/popular')
export const getEmCartaz = () => buscar('/movie/now_playing', { region: 'BR' })
export const getMaisBemAvaliados = () => buscar('/movie/top_rated')
export const getEmBreve = () => buscar('/movie/upcoming', { region: 'BR' })