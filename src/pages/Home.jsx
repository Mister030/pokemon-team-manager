import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <h1>Welkom bij de Pokémon Team Manager</h1>
      <p>Met deze app stel je je eigen Pokémon teams samen.</p>

      <ol>
        <li>Bekijk alle Pokémon in de lijst.</li>
        <li>Zet je favoriete Pokémon bij je favorieten.</li>
        <li>Maak een team en voeg je favorieten toe (maximaal 6 per team).</li>
      </ol>

      <Link to="/list" className="knop">
        Naar de Pokémon lijst
      </Link>
    </section>
  )
}

export default Home
