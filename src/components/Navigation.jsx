import { Link } from 'react-router-dom'

// <Link> wisselt van pagina zonder dat de browser opnieuw laadt
function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/list">Pokémon lijst</Link>
      <Link to="/favorieten">Favorieten</Link>
      <Link to="/teams">Teams</Link>
    </nav>
  )
}

export default Navigation
