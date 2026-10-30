import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard.jsx'

function Favorieten({ favorieten, onToggleFavoriet }) {
  return (
    <section>
      <h1>Favorieten</h1>

      {favorieten.length === 0 ? (
        <p>
          Je hebt nog geen favorieten. Ga naar de <Link to="/list">Pokémon lijst</Link> en klik
          op &quot;Maak favoriet&quot;.
        </p>
      ) : (
        <div className="grid">
          {favorieten.map((pokemon) => (
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
      )}
    </section>
  )
}

export default Favorieten
