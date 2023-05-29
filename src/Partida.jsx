const Partida = (props) => {

  const findPartida = (id) => {
    const partidaDesejada = props.partidas.find((partida) => {
      return partida.clube_visitante_id == parseInt(id) || partida.clube_casa_id == parseInt(id);
    })

    return partidaDesejada.local;
    // return 'qualquer'
  }

  return (
    <div className="clube-info">
      <span>{findPartida(props.clube.id)}</span>
    </div>
  );
};

export default Partida;
