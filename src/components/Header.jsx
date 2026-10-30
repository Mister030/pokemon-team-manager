import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Pokémon Team Manager
      </Link>
    </header>
  )
}

export default Header
