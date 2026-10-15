import { memo, useEffect, useRef, useState } from 'react'

const PRIORIDADES = [
  { id: 'alta', label: 'Alta' },
  { id: 'media', label: 'Media' },
  { id: 'baja', label: 'Baja' },
]

function TaskForm({ onAdd }) {
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState('media')
  // useRef: acceso directo al <input> sin provocar re-renders
  const inputRef = useRef(null)

  // Auto-focus al montar el formulario
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const texto = titulo.trim()
    if (!texto) return
    onAdd({
      id: crypto.randomUUID(),
      title: texto,
      priority: prioridad,
      completed: false,
      createdAt: Date.now(),
    })
    setTitulo('')
    inputRef.current?.focus() // devuelve el foco para seguir escribiendo
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2 className="card-title">➕ Nueva tarea</h2>

      <input
        ref={inputRef}
        className="input"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="¿Qué necesitas hacer?"
        maxLength={80}
      />

      <span className="label">Prioridad</span>
      <div className="priority-group">
        {PRIORIDADES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`priority-btn ${p.id} ${prioridad === p.id ? 'active' : ''}`}
            onClick={() => setPrioridad(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <button type="submit" className="btn btn-primary" disabled={!titulo.trim()}>
        Agregar tarea
      </button>
    </form>
  )
}

// memo: como onAdd es estable (useCallback), el formulario no se re-renderiza
export default memo(TaskForm)