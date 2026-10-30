import { Link } from 'react-router'

export default function NaoEncontrada() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-black text-orange-500">Erro 404!</h1>
      <p className="text-slate-400">Página não encontrada</p>
      <Link to="/" className="bg-orange-500 px-6 py-2 rounded-full font-bold hover:bg-white hover:text-orange-500 transition">
        Voltar
      </Link>
    </div>
  )
}