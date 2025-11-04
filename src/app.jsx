import { useState, useEffect } from 'react'
export default function App() {
  const [id, setId] = useState(1)
  const [max, setMax] = useState(1)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    fetch('/comics/max.txt').then(r => r.text()).then(m => setMax(+m))
    fetch(`/comics/${id.toString().padStart(3,'0')}.txt`)
      .then(r => r.text())
      .then(setCaption)
  }, [id])

  return (
    <main style={{maxWidth:720, margin:'0 auto', textAlign:'center', padding:20, background:'#111', color:'#fff', minHeight:'100vh'}}>
      <h1 style={{fontSize:'3rem'}}>Kizmyt Comics</h1>
      <div style={{margin:'20px 0'}}>
        <input type="number" min="1" max={max} value={id}
          onChange={e=>setId(Math.min(max, Math.max(1, +e.target.value)))}
          style={{fontSize:28, width:100, padding:8}} />
      </div>
      <img src={`/comics/${id.toString().padStart(3,'0')}.jpg`}
           style={{maxWidth:'100%', width:650, border:'8px solid #333', borderRadius:12}}
           alt={`Comic #${id}`} />
      <p style={{fontSize:20, whiteSpace:'pre-wrap', margin:20}}>
        {caption || 'No caption'}
      </p>
      <div style={{gap:15, display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
        <button onClick={()=>setId(1)}>First</button>
        <button onClick={()=>setId(p=>Math.max(1,p-1))}>◄ Prev</button>
        <button onClick={()=>setId(p=>Math.min(max,p+1))}>Next ►</button>
        <button onClick={()=>setId(max)}>Last</button>
      </div>
    </main>
  )
}
