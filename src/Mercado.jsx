import { useState, useEffect } from 'react';
import JogadorMercado from "./JogadorMercado.jsx";

const JogadoresMercado = () => {
  // Criação dos estados
  const [jogadores, setJogadores] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [posicoes, setPosicoes] = useState([]);
  const [status, setStatus] = useState(8);
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {  
    fetch("https://api.cartola.globo.com/atletas/mercado")
    .then((res) => res.json())
    .then((json) => {

      // Transformando objeto em Array
      const jogadoresArray  = Object.values(json.atletas);
      // Ordenando o array pela pontuacao dos jogadores
      jogadoresArray.sort((a, b) => b.media_num - a.media_num);
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
      
      const statusArray  = Object.values(json.status);
      console.log(statusArray);
      // Adicionando o array no estado de clubes
      setStatus(statusArray);
    })
  }, [])

  useEffect(() => {  
    fetch("https://api.cartola.globo.com/partidas")
    .then((res) => res.json())
    .then((json) => {
      const partidasArray  = Object.values(json.partidas);
      setPartidas(partidasArray);
    })
  })
  
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

  const findStatus = (id) => {
    // Localizando legenda corresponde ao clube com id informado
    let statusProcurado = status.find(status => status.id == parseInt(id));
    return statusProcurado;
  }

  return (
    <div className="container-cartola">
       {jogadores.length > 0 && jogadores.map((jogador) => (
        <JogadorMercado jogador={jogador} clube={findClube(jogador.clube_id)} posicao={findPosicao(jogador.posicao_id)} statusJogador={findStatus(jogador.status_id)} partidas={partidas} key={jogador.apelido + jogador.clube_id} />
      ))
      }
    </div>
  );
};

export default JogadoresMercado;
