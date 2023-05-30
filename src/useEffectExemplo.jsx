import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [contador, setContador] = useState(2);
  const [contador2, setContador2] = useState(3);

  useEffect(() => {  
    // Vai executar a cada alteração no nome
    console.log('O nome foi alterado', contador)
  })

  return (
    <>
      <h1>Olá mundo</h1>
      <button onClick={() => setContador(contador + 1)}>Aumentar</button>
      <button onClick={() => setContador2(contador2 + 1)}>Aumentar 2</button>
      {contador}
    </>
  )
}

export default App
