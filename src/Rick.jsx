import React, { useState, useEffect } from 'react';
import './Rick.css'

const RickAndMortyApp = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Função para obter a lista de personagens da API
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCharacterClick = async (characterId) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setSelectedCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    if (selectedCharacter) {
      const fetchEpisodes = async () => {
        try {
          const episodeUrls = selectedCharacter.episode;
          const episodePromises = episodeUrls.map((url) => fetch(url).then((response) => response.json()));
          const episodesData = await Promise.all(episodePromises);
          setEpisodes(episodesData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchEpisodes();
    }
  }, [selectedCharacter]);

  const filteredCharacters = characters.filter((character) => {
    if (statusFilter === '') {
      return true;
    }
    return character.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <>
      <h1>Rick and Morty App</h1>
      <div className="container">

        <div>
          <h2>Lista de Personagens</h2>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button onClick={handleSearch}>Pesquisar</button>

          <select value={statusFilter} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </select>

          <ul>
            {filteredCharacters.map((character) => (
              <li key={character.id}>
                <img  onClick={() => handleCharacterClick(character.id)} src={character.image} alt={character.name} />
                <p>{character.name}</p>
                <p>{character.status}</p>
              </li>
            ))}
          </ul>
        </div>

        {selectedCharacter && (
          <div>
            <h2>Detalhes do Personagem</h2>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <p>Nome: {selectedCharacter.name}</p>
            <p>Status: {selectedCharacter.status}</p>
            <p>Espécie: {selectedCharacter.species}</p>

            <h3>Episódios:</h3>
            <ul>
              {episodes.map((episode) => (
                <li key={episode.id}>
                  <p>Número: {episode.episode}</p>
                  <p>Título: {episode.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default RickAndMortyApp;
