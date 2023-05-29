import Clube from "./Clube.jsx";
import Partida from "./Partida.jsx";

const JogadorMercado = (props) => {


  return (
    <li className="container-players" key={props.jogador.apelido}>
      <div className="container-left">
        <Clube clube={props.clube}/>
        <img className="player-picture" src="https://s.sde.globo.com/media/person_role/2023/05/27/photo_220x220.png" alt="foto"></img>
        <div className="player-info">
          <span className="apelido">{props.jogador.apelido} </span>
          <span className="posicao">{props.posicao.nome.toUpperCase()}</span>
        </div>
      </div>
      <span className={props.statusJogador.nome == 'Provável' ? ' positiva' : ' negativa'}>{props.statusJogador.nome}</span>
      <span>${props.jogador.preco_num}</span>
      <span className={props.jogador.variacao_num >= 0 ? ' positiva' : ' negativa'}>{props.jogador.variacao_num.toFixed(2)}</span>
      <span>{props.jogador.pontos_num}</span>
      <span className={props.jogador.media_num >= 0 ? ' positiva' : ' negativa'}>{props.jogador.media_num.toFixed(2)}</span>
      <span className={props.jogador.minimo_para_valorizar >= 0 ? ' positiva' : ' negativa'}>{props.jogador.minimo_para_valorizar.toFixed(2)}</span>
      <Partida clube={props.clube} partidas={props.partidas} />
      
      

      
    </li>
  );
};

export default JogadorMercado;
