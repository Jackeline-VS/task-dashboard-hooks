import { memo } from 'react'

const ETIQUETA = { alta: 'Alta', media: 'Media', baja: 'Baja' }
const formatoFecha = new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'short' })

function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={`task ${task.completed ? 'done' : ''}`}>
      <button className="check" onClick={() => onToggle(task.id)} aria-label="Completar">
        {task.completed ? '✓' : ''}
      </button>
      <div className="task-body">
        <span className="task-title">{task.title}</span>
        <span className="task-meta">Creada el {formatoFecha.format(task.createdAt)}</span>
      </div>
      <span className={`tag ${task.priority}`}>{ETIQUETA[task.priority]}</span>
      <button className="icon-btn" onClick={() => onRemove(task.id)} aria-label="Eliminar">
        🗑️
      </button>
    </li>
  )
}

// React.memo: solo se re-renderiza la tarea cuyo objeto cambió
export default memo(TaskItem)