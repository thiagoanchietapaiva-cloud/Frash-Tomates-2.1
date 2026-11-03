const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY

export const IMG_URL = 'https://image.tmdb.org/t/p/w500'
export const IMG_URL_GRANDE = 'https://image.tmdb.org/t/p/original'

async function buscar(caminho, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, language: 'pt-BR', ...params })
  const resposta = await fetch(`${BASE_URL}${caminho}?${query}`)
  if (!resposta.ok) throw new Error('Erro ao buscar filmes')
  const dados = await resposta.json()
  return dados.results
}
const KEY = import.meta.env.VITE_TMDB_KEY
const BASE = 'https://api.themoviedb.org/3'
export const filmesPopulares = async () => {
  const res = await fetch(`${BASE}/movie/popular?api_key=${KEY}&language=pt-BR`)
  const data = await res.json()
  return data.results
}
export const buscarFilmes = async (query) => {
  const res = await fetch(`${BASE}/search/movie?api_key=${KEY}&language=pt-BR&query=${query}`)
  const data = await res.json()
  return data.results
}
export const detalheFilme = async (id) => {
  const res = await fetch(`${BASE}/movie/${id}?api_key=${KEY}&language=pt-BR`)
  const data = await res.json()
  return data
}
export const getPopulares = () => buscar('/movie/popular')
export const getEmCartaz = () => buscar('/movie/now_playing', { region: 'BR' })
export const getMaisBemAvaliados = () => buscar('/movie/top_rated')
export const getEmBreve = () => buscar('/movie/upcoming', { region: 'BR' })