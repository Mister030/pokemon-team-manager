import { Link } from 'react-router-dom'
function PokemonCard({ id, name, image, isFavoriet, onToggleFavoriet }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>
        #{id} {name}
      </h3>
      <Link to={`/detail/${id}`}>Bekijk details</Link>
      <button onClick={() => onToggleFavoriet({ id, name, image })}>
        {isFavoriet ? '★ Verwijder favoriet' : '☆ Maak favoriet'}
      </button>
    </div>
  )
}

export default PokemonCard
