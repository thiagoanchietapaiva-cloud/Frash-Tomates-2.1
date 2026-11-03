import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from '../context/AuthContext'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/filme/:id" element={<FilmeDetalhes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}