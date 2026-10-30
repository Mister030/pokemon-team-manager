import { Link } from 'react-router-dom'

// <Link> wisselt van pagina zonder dat de browser opnieuw laadt
function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/list">Pokémon lijst</Link>
      {/* Detail heeft een id nodig: hier Pikachu (#25) als voorbeeld. Andere Pokémon via "Bekijk details". */}
      <Link to="/detail/25">Detail</Link>
      <Link to="/favorieten">Favorieten</Link>
      <Link to="/teams">Teams</Link>
    </nav>
  )
}

export default Navigation
