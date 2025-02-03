import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='text-center'>
      <p className='text-2xl font-black'>hello!</p>
    </div>
  )
}

export default App
