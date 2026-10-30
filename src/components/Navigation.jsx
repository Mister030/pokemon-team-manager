import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/list">Pokémon lijst</Link>
      <Link to="/detail/25">Detail</Link>
      <Link to="/favorieten">Favorieten</Link>
      <Link to="/teams">Teams</Link>
    </nav>
  )
}

export default Navigation
