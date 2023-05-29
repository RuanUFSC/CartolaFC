import { useState, useEffect } from 'react';

const Jogadores = () => {
  // Criação dos estados
  const [jogadores, setJogadores] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [posicoes, setPosicoes] = useState([]);

  // Chamada na Api para receber os dados
  useEffect(() => {  
    fetch("https://api.cartola.globo.com/atletas/pontuados/8")
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
  }, [])


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

  return (
    <div className="container-cartola">
      <img className="cartola-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cartola_FC_logo.svg/2560px-Cartola_FC_logo.svg.png" alt="cartola logo" />
      {jogadores.length > 0 && jogadores.map((jogador) => (
        <li className="container-players" key={jogador.apelido}>
          <div className="container-left">
            <div className="clube-info">
              <img className="team-picture" src={findClube(jogador.clube_id).escudos['60x60']} alt="time"></img>
              <span className="abreviacao">{findClube(jogador.clube_id).abreviacao}</span>
            </div>
            <img className="player-picture" src="https://s.sde.globo.com/media/person_role/2023/05/27/photo_220x220.png" alt="foto"></img>
            <div className="player-info">
              <span className="apelido">{jogador.apelido} </span>
              <span className="posicao">{findPosicao(jogador.posicao_id).nome.toUpperCase()}</span>
            </div>
          </div>
          <span className={jogador.pontuacao >= 0 ? 'pontuacao positiva' : 'pontuacao negativa'}>{jogador.pontuacao.toFixed(2)}</span>
        </li>
      ))
      }
    </div>
  );
};

export default Jogadores;
