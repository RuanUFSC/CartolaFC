const Jogador = (props) => {

  return (
    <li className="container-players" key={props.jogador.apelido}>
      <div className="container-left">
        <div className="clube-info">
          <img className="team-picture" src={props.clube.escudos['60x60']} alt="time"></img>
          <span className="abreviacao">{props.clube.abreviacao}</span>
        </div>
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
