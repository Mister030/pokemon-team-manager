import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { laad, bewaar } from '../opslag.js'

const MAX_POKEMON = 6

function Teams({ favorieten }) {
  const [teams, setTeams] = useState(() => laad('teams'))
  const [nieuweNaam, setNieuweNaam] = useState('')

  useEffect(() => {
    bewaar('teams', teams)
  }, [teams])

  function maakTeam(event) {
    event.preventDefault()
    if (nieuweNaam.trim() === '') return

    const nieuwTeam = { id: Date.now(), naam: nieuweNaam, pokemon: [] }
    setTeams([...teams, nieuwTeam])
    setNieuweNaam('')
  }

  function hernoemTeam(teamId, naam) {
    setTeams(teams.map((team) => (team.id === teamId ? { ...team, naam: naam } : team)))
  }

  function controleerNaam(team) {
    if (team.naam.trim() === '') {
      hernoemTeam(team.id, 'Team zonder naam')
    }
  }

  function verwijderTeam(teamId) {
    setTeams(teams.filter((team) => team.id !== teamId))
  }

  function voegPokemonToe(teamId, pokemonId) {
    const team = teams.find((t) => t.id === teamId)
    const pokemon = favorieten.find((f) => f.id === Number(pokemonId))

    if (team.pokemon.length >= MAX_POKEMON) {
      alert(`Een team mag maximaal ${MAX_POKEMON} Pokémon hebben.`)
      return
    }

    if (team.pokemon.some((p) => p.id === pokemon.id)) {
      alert(`${pokemon.name} zit al in dit team.`)
      return
    }

    setTeams(
      teams.map((t) => (t.id === teamId ? { ...t, pokemon: [...t.pokemon, pokemon] } : t)),
    )
  }

  function verwijderPokemon(teamId, pokemonId) {
    setTeams(
      teams.map((t) =>
        t.id === teamId ? { ...t, pokemon: t.pokemon.filter((p) => p.id !== pokemonId) } : t,
      ),
    )
  }

  return (
    <section>
      <h1>Teams</h1>

      <form onSubmit={maakTeam} className="filters">
        <input
          type="text"
          placeholder="Naam van nieuw team"
          value={nieuweNaam}
          onChange={(e) => setNieuweNaam(e.target.value)}
        />
        <button type="submit">Team aanmaken</button>
      </form>

      {favorieten.length === 0 && (
        <p>
          Tip: zet eerst Pokémon bij je favorieten in de <Link to="/list">Pokémon lijst</Link>.
          Die kun je daarna aan een team toevoegen.
        </p>
      )}

      {teams.length === 0 && <p>Je hebt nog geen teams.</p>}

      {teams.map((team) => {
        const isVol = team.pokemon.length >= MAX_POKEMON

        return (
          <div key={team.id} className="team">
            <input
              className="team-naam"
              aria-label="Teamnaam"
              value={team.naam}
              onChange={(e) => hernoemTeam(team.id, e.target.value)}
              onBlur={() => controleerNaam(team)}
            />

            <p>
              {team.pokemon.length} / {MAX_POKEMON} Pokémon
            </p>

            <ul className="team-leden">
              {team.pokemon.map((pokemon) => (
                <li key={pokemon.id}>
                  <img src={pokemon.image} alt={pokemon.name} />
                  {pokemon.name}
                  <button onClick={() => verwijderPokemon(team.id, pokemon.id)}>Verwijder</button>
                </li>
              ))}
            </ul>

            <div className="team-acties">
              <select
                value=""
                disabled={isVol || favorieten.length === 0}
                onChange={(e) => voegPokemonToe(team.id, e.target.value)}
              >
                <option value="">{isVol ? 'Team is vol' : '+ Voeg een favoriet toe'}</option>
                {favorieten.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>

              <button className="verwijder" onClick={() => verwijderTeam(team.id)}>
                Verwijder team
              </button>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Teams
