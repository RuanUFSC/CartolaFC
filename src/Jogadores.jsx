import { useState, useEffect } from 'react';
import Jogador from "./Jogador.jsx";

const Jogadores = () => {
  // Criação dos estados
  const [jogadores, setJogadores] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [posicoes, setPosicoes] = useState([]);
  const [rodada, setRodada] = useState(8);

  useEffect(() => {  
    fetch("https://api.cartola.globo.com/atletas/pontuados/" + rodada)
    .then((res) => res.json())
    .then((json) => {

      // Transformando objeto em Array
      const jogadoresArray  = Object.values(json.atletas);
      // Ordenando o array pela pontuacao dos jogadores
      jogadoresArray.sort((a, b) => b.pontuacao - a.pontuacao);
      // Adicionando o array no estado de jogadores
      setJogadores(jogadoresArray);

      // Transformando objeto em Array
      const posicoesArray  = Object.values(json.posicoes);
      // Adicionando o array no estado de posicoes
      setPosicoes(posicoesArray);
      
      // Transformando objeto em Array
      const clubesArray  = Object.values(json.clubes);
      // Adicionando o array no estado de clubes
      setClubes(clubesArray);
    })
  }, [rodada])
  
  const findPosicao = (id) => {
    // Localizando legenda corresponde a posicao com id informado
    let posicao = posicoes.find(posicao => posicao.id == id);
    return posicao;
  }

  const findClube = (id) => {
    // Localizando legenda corresponde ao clube com id informado
    let clube = clubes.find(clubes => clubes.id == id);
    return clube;
  }

  const mudarRodada = (event) => {
    const selectedRodada = parseInt(event.target.value);
    setRodada(selectedRodada);
  }

  return (
    <div className="container-cartola">
      <div>
        <span>Selecione a rodada</span>
        <select value={rodada} onChange={mudarRodada}>
          <option value="1">Rodada 1</option>
          <option value="2">Rodada 2</option>
          <option value="3">Rodada 3</option>
          <option value="4">Rodada 4</option>
          <option value="5">Rodada 5</option>
          <option value="6">Rodada 6</option>
          <option value="7">Rodada 7</option>
          <option value="8">Rodada 8</option>
        </select>
      </div>
      <img className="cartola-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cartola_FC_logo.svg/2560px-Cartola_FC_logo.svg.png" alt="cartola logo" />
      {jogadores.length > 0 && jogadores.map((jogador) => (
        <Jogador jogador={jogador} clube={findClube(jogador.clube_id)} posicao={findPosicao(jogador.posicao_id)}  key={jogador.apelido + jogador.clube_id} />
      ))
      }
    </div>
  );
};

export default Jogadores;
