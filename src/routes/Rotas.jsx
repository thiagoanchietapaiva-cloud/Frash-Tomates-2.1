import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Filmes from '../pages/Filmes'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import NaoEncontrada from '../pages/NaoEncontrada'
import FilmeDetalhes from '../pages/FilmeDetalhes'
export default function Rotas() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="bg-slate-900 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 bg-slate-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/filmes" element={<Filmes />} />
              <Route path="/filme/:id" element={<FilmeDetalhes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="*" element={<NaoEncontrada />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}