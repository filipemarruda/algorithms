import React, { useState, useEffect } from 'react';
import Repositorio from './Repositorio';
import axios from 'axios';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    async function fetchRepositories () {
      // const response = await fetch('https://api.github.com/users/filipemarruda/repos');
      // const data = await response.json();

      const response = await axios.get('https://api.github.com/users/filipemarruda/repos')
      setRepositories(response.data);
    }

    fetchRepositories();

  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <h1>Github Repositories</h1>
      <ol>
        {
          repositories.map(repository => 
            <Repositorio key={repository.id} repository={repository} onFavorite={handleFavorite}> 
              <span style={{ color: 'blue' }}>{repository.name}</span>
            </Repositorio>
          )
        }
      </ol>
    </>
  )
}
