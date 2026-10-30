import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Detail({ favorieten, onToggleFavoriet }) {
  const { id } = useParams()

  const [pokemon, setPokemon] = useState(null)
  const [fout, setFout] = useState(false)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Niet gevonden')
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setPokemon(data)
        setFout(false)
      })
      .catch(() => setFout(true))
  }, [id])

  if (fout) {
    return (
      <p>
        Deze Pokémon bestaat niet. <Link to="/list">Terug naar de lijst</Link>
      </p>
    )
  }

  if (pokemon === null) return <p>Pokémon laden...</p>

  const isFavoriet = favorieten.some((f) => f.id === pokemon.id)

  return (
    <section className="detail">
      <Link to="/list">← Terug naar de lijst</Link>

      <h1>
        #{pokemon.id} {pokemon.name}
      </h1>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>

      <button
        onClick={() =>
          onToggleFavoriet({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
          })
        }
      >
        {isFavoriet ? '★ Verwijder uit favorieten' : '☆ Voeg toe aan favorieten'}
      </button>
    </section>
  )
}

export default Detail
