import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import StatsCards from './components/StatsCards'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Toolbar from './components/Toolbar'
import { ThemeProvider } from './contexts/ThemeContext'
import { ThemeContext } from './contexts/theme'
import { useDebounce } from './hooks/useDebounce'
import tasksReducer, { ACTIONS, initialState } from './hooks/useTasksReducer'

const STORAGE_KEY = 'taskhub-state'

// Inicialización perezosa del reducer: recupera el estado guardado
function cargarEstado(inicial) {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    return guardado ? { ...inicial, ...JSON.parse(guardado) } : inicial
  } catch {
    return inicial
  }
}

function Dashboard() {
  // useReducer: estado complejo (lista + filtro + orden)
  const [state, dispatch] = useReducer(tasksReducer, initialState, cargarEstado)
  // useState: estado de UI local (texto del buscador)
  const [search, setSearch] = useState('')
  // useDebounce: la lista se filtra 300 ms después de dejar de escribir
  const debouncedSearch = useDebounce(search, 300)
  // useContext: tema global sin prop drilling
  const { theme, toggleTheme } = useContext(ThemeContext)

  // useEffect: sincroniza el estado con localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const { items, filter, sort } = state

  // useMemo: las estadísticas solo se recalculan cuando cambian las tareas
  const stats = useMemo(() => {
    const total = items.length
    const completadas = items.filter((t) => t.completed).length
    return {
      total,
      completadas,
      pendientes: total - completadas,
      progreso: total ? Math.round((completadas / total) * 100) : 0,
    }
  }, [items])

  // useCallback: referencias estables para los hijos con React.memo
  // (dispatch es estable, por eso el array de dependencias va vacío)
  const handleAdd = useCallback((task) => dispatch({ type: ACTIONS.ADD, payload: task }), [])
  const handleToggle = useCallback((id) => dispatch({ type: ACTIONS.TOGGLE, payload: id }), [])
  const handleRemove = useCallback((id) => dispatch({ type: ACTIONS.REMOVE, payload: id }), [])

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
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
            <span>{theme === 'light' ? 'Modo oscuro' : 'Modo claro'}</span>
          </button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Gestor de <span className="gradient-text">Tareas</span></h1>
          <p>Organiza, prioriza y completa tu trabajo en un solo lugar.</p>
        </section>

        <StatsCards
          total={stats.total}
          pendientes={stats.pendientes}
          completadas={stats.completadas}
          progreso={stats.progreso}
        />

        <div className="layout">
          <TaskForm onAdd={handleAdd} />

          <section className="card">
            <div className="card-head">
              <h2 className="card-title">📌 Mis tareas</h2>
              {stats.completadas > 0 && (
                <button
                  className="link-btn"
                  onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
                >
                  Limpiar completadas
                </button>
              )}
            </div>

            {/* Toolbar sin memo: su prop "search" cambia en cada tecla (evitamos overuse) */}
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
              search={debouncedSearch}
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
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}