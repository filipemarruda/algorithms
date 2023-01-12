export default function Repositorio({ repository, onFavorite, children }) {
  return (
    <li key={repository.id}>{children} {repository.favorite && "<span>(Favorito)</span>"}
      <button onClick={() => onFavorite(repository.id)}>Favoritar</button>
    </li>
  )
}