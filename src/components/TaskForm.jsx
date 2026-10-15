import { useState } from 'react'

const PRIORIDADES = [
  { id: 'alta', label: 'Alta' },
  { id: 'media', label: 'Media' },
  { id: 'baja', label: 'Baja' },
]

function TaskForm({ onAdd }) {
  // useState: estado de UI local (solo le importa al formulario)
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState('media')

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
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2 className="card-title">➕ Nueva tarea</h2>

      <input
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

export default TaskForm