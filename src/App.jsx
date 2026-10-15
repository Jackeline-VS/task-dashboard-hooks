import { useReducer, useState } from 'react'
import StatsCards from './components/StatsCards'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Toolbar from './components/Toolbar'
import tasksReducer, { ACTIONS, initialState } from './hooks/useTasksReducer'

function Dashboard() {
  // useReducer: estado complejo (lista + filtro + orden) con lógica centralizada
  const [state, dispatch] = useReducer(tasksReducer, initialState)
  // useState: estado de UI local (texto de búsqueda)
  const [search, setSearch] = useState('')

  const { items, filter, sort } = state
  const total = items.length
  const completadas = items.filter((t) => t.completed).length
  const progreso = total ? Math.round((completadas / total) * 100) : 0

  const handleAdd = (task) => dispatch({ type: ACTIONS.ADD, payload: task })
  const handleToggle = (id) => dispatch({ type: ACTIONS.TOGGLE, payload: id })
  const handleRemove = (id) => dispatch({ type: ACTIONS.REMOVE, payload: id })

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">✓</span>
            <div>
              <strong>TaskHub</strong>
              <small>Dashboard de gestión</small>
            </div>
          </div>
          {/* Paso 2: botón de tema con useContext */}
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Gestor de <span className="gradient-text">Tareas</span></h1>
          <p>Organiza, prioriza y completa tu trabajo en un solo lugar.</p>
        </section>

        <StatsCards
          total={total}
          pendientes={total - completadas}
          completadas={completadas}
          progreso={progreso}
        />

        <div className="layout">
          <TaskForm onAdd={handleAdd} />

          <section className="card">
            <div className="card-head">
              <h2 className="card-title">📌 Mis tareas</h2>
              {completadas > 0 && (
                <button
                  className="link-btn"
                  onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
                >
                  Limpiar completadas
                </button>
              )}
            </div>

            <Toolbar
              search={search}
              onSearch={setSearch}
              filter={filter}
              onFilter={(f) => dispatch({ type: ACTIONS.FILTER, payload: f })}
              sort={sort}
              onSort={(s) => dispatch({ type: ACTIONS.SORT, payload: s })}
            />

            <TaskList
              tasks={items}
              filter={filter}
              sort={sort}
              search={search}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          </section>
        </div>
      </main>

      <footer className="footer">
        ✓ TaskHub · Práctica Semana 07 (Parte 2) — React Hooks · UNCP
      </footer>
    </>
  )
}

export default function App() {
  return <Dashboard />
}