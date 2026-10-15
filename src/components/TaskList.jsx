import { useMemo } from 'react'
import { procesarTareas } from '../utils/procesarTareas'
import TaskItem from './TaskItem'

function TaskList({ tasks, filter, sort, search, onToggle, onRemove }) {
  // useMemo: filtra y ordena SOLO si cambian tasks, filter, sort o search
  const processedTasks = useMemo(
    () => procesarTareas(tasks, filter, sort, search),
    [tasks, filter, sort, search]
  )

  if (processedTasks.length === 0) {
    return (
      <div className="empty">
        <span>📭</span>
        <p>No hay tareas para mostrar</p>
        <small>Agrega una nueva o cambia el filtro</small>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {processedTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  )
}

export default TaskList