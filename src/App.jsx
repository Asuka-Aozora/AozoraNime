import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/organism/home/Navbar'
import AnimeDetailPage from './pages/AnimeDetailPage'



function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
