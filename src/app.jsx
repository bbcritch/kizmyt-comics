import { useState, useEffect } from 'react'
export default function App() {
  const [id, setId] = useState(1)
  const [max, setMax] = useState(1)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    fetch(`/comics/max.txt`).then(r => r.text()).then(m => setMax(+m))
    fetch(`/comics/${id.toString().padStart(3,'0')}.txt`)
      .then(r => r.text())
      .then(setCaption)
  }, [id])

  return (
    <main style={{ maxWidth:720, margin:'0 auto',
