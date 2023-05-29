const Clube = (props) => {

  return (
    <div className="clube-info">
      <img className="team-picture" src={props.clube.escudos['60x60']} alt="time"></img>
      <span className="abreviacao">{props.clube.abreviacao}</span>
    </div>
  );
};

export default Clube;
