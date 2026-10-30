import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import List from './pages/List.jsx'
import Detail from './pages/Detail.jsx'
import Favorieten from './pages/Favorieten.jsx'
import Teams from './pages/Teams.jsx'

function App() {
  // Favorieten staan in App, omdat meerdere pagina's ze nodig hebben.
  // Bij het starten lezen we de opgeslagen favorieten uit localStorage (anders een lege lijst).
  const [favorieten, setFavorieten] = useState(JSON.parse(localStorage.getItem('favorieten')) ?? [])

  // Elke keer als de favorieten veranderen: opslaan in localStorage
  useEffect(() => {
    localStorage.setItem('favorieten', JSON.stringify(favorieten))
  }, [favorieten])

  // Favoriet toevoegen, of verwijderen als hij er al in staat
  function toggleFavoriet(pokemon) {
    const isAlFavoriet = favorieten.some((f) => f.id === pokemon.id)

    if (isAlFavoriet) {
      setFavorieten(favorieten.filter((f) => f.id !== pokemon.id))
    } else {
      setFavorieten([...favorieten, pokemon])
    }
  }

  return (
    <>
      <Header />
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/list"
            element={<List favorieten={favorieten} onToggleFavoriet={toggleFavoriet} />}
          />
          <Route
            path="/detail/:id"
            element={<Detail favorieten={favorieten} onToggleFavoriet={toggleFavoriet} />}
          />
          <Route
            path="/favorieten"
            element={<Favorieten favorieten={favorieten} onToggleFavoriet={toggleFavoriet} />}
          />
          <Route path="/teams" element={<Teams favorieten={favorieten} />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
