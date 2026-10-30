import { useState } from 'react'
import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard.jsx'

function Favorieten({ favorieten, onToggleFavoriet }) {
  const [zoekterm, setZoekterm] = useState('')

  const zichtbaar = favorieten.filter((p) => p.name.includes(zoekterm.toLowerCase()))

  return (
    <section>
      <h1>Favorieten</h1>

      {favorieten.length === 0 ? (
        <p>
          Je hebt nog geen favorieten. Ga naar de <Link to="/list">Pokémon lijst</Link> en klik
          op &quot;Maak favoriet&quot;.
        </p>
      ) : (
        <>
          <div className="filters">
            <input
              type="text"
              placeholder="Zoek in je favorieten"
              value={zoekterm}
              onChange={(e) => setZoekterm(e.target.value)}
            />
          </div>

          <p>
            {zichtbaar.length} van {favorieten.length} favorieten
          </p>

          <div className="grid">
            {zichtbaar.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                isFavoriet={true}
                onToggleFavoriet={onToggleFavoriet}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Favorieten
