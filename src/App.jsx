import { useState, useEffect } from 'react'
import './App.css'
import Jogadores from './Jogadores.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Jogadores/>
    </>
  )
}

export default App
