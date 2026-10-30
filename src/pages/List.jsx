import { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard.jsx'

const API_URL = 'https://pokeapi.co/api/v2'
const PLAATJE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// Types die voorkomen bij de eerste 151 Pokémon
const TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'fairy',
]

function List({ favorieten, onToggleFavoriet }) {
  const [pokemons, setPokemons] = useState([])
  const [laden, setLaden] = useState(true)
  const [fout, setFout] = useState(false)

  const [zoekterm, setZoekterm] = useState('')
  const [type, setType] = useState('')
  const [namenVanType, setNamenVanType] = useState([])
  const [sortering, setSortering] = useState('nummer')

  // Eén keer de lijst ophalen als de pagina laadt ([] = geen dependencies)
  useEffect(() => {
    fetch(`${API_URL}/pokemon?limit=151`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        // De API geeft alleen naam + url. Het nummer is de plek in de lijst + 1.
        const lijst = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `${PLAATJE_URL}/${index + 1}.png`,
        }))

        setPokemons(lijst)
        setLaden(false)
      })
      .catch(() => {
        setFout(true)
        setLaden(false)
      })
  }, [])

  // Filter op type: de API geeft per type een lijst met Pokémon-namen
  function kiesType(nieuwType) {
    setType(nieuwType)
    setNamenVanType([])

    if (nieuwType === '') return

    fetch(`${API_URL}/type/${nieuwType}`)
      .then((response) => response.json())
      .then((data) => {
        setNamenVanType(data.pokemon.map((p) => p.pokemon.name))
      })
  }

  // 1. Zoeken op naam
  let zichtbaar = pokemons.filter((p) => p.name.includes(zoekterm.toLowerCase()))

  // 2. Filteren op type
  if (type !== '') {
    zichtbaar = zichtbaar.filter((p) => namenVanType.includes(p.name))
  }

  // 3. Sorteren op naam (filter maakt al een nieuwe array, dus sort mag hier)
  if (sortering === 'az') {
    zichtbaar.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortering === 'za') {
    zichtbaar.sort((a, b) => b.name.localeCompare(a.name))
  }

  if (laden) return <p>Pokémon laden...</p>
  if (fout) return <p>Er ging iets mis bij het ophalen van de Pokémon.</p>

  return (
    <section>
      <h1>Pokémon lijst</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Zoek op naam"
          value={zoekterm}
          onChange={(e) => setZoekterm(e.target.value)}
        />

        <select value={type} onChange={(e) => kiesType(e.target.value)}>
          <option value="">Alle types</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={sortering} onChange={(e) => setSortering(e.target.value)}>
          <option value="nummer">Sorteer op nummer</option>
          <option value="az">Naam A-Z</option>
          <option value="za">Naam Z-A</option>
        </select>
      </div>

      <p>{zichtbaar.length} Pokémon gevonden</p>

      <div className="grid">
        {zichtbaar.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            isFavoriet={favorieten.some((f) => f.id === pokemon.id)}
            onToggleFavoriet={onToggleFavoriet}
          />
        ))}
      </div>
    </section>
  )
}

export default List
