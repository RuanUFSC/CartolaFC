import Clube from "./Clube.jsx";

const Jogador = (props) => {


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
      <span className={props.jogador.pontuacao >= 0 ? 'pontuacao positiva' : 'pontuacao negativa'}>{props.jogador.pontuacao.toFixed(2)}</span>
    </li>
  );
};

export default Jogador;
