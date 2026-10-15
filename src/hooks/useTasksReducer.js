// Tipos de acción del reducer
export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  TOGGLE: 'TOGGLE',
  FILTER: 'FILTER',
  SORT: 'SORT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
}

// Tareas de ejemplo para la demo
const TAREAS_EJEMPLO = [
  { id: 'demo-1', title: 'Revisar la guía de React Hooks', priority: 'alta', completed: true, createdAt: 1792000000000 },
  { id: 'demo-2', title: 'Implementar useReducer en el dashboard', priority: 'alta', completed: false, createdAt: 1792000100000 },
  { id: 'demo-3', title: 'Documentar el README con diagramas', priority: 'media', completed: false, createdAt: 1792000200000 },
  { id: 'demo-4', title: 'Grabar evidencias con el Profiler', priority: 'baja', completed: false, createdAt: 1792000300000 },
]

export const initialState = { items: TAREAS_EJEMPLO, filter: 'all', sort: 'recent' }

// Función reductora PURA: nunca muta el estado, siempre devuelve uno nuevo
function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, items: [action.payload, ...state.items] }

    case ACTIONS.REMOVE:
      return { ...state, items: state.items.filter((t) => t.id !== action.payload) }

    case ACTIONS.TOGGLE:
      return {
        ...state,
        items: state.items.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      }

    case ACTIONS.FILTER:
      return { ...state, filter: action.payload }

    case ACTIONS.SORT:
      return { ...state, sort: action.payload }

    case ACTIONS.CLEAR_COMPLETED:
      return { ...state, items: state.items.filter((t) => !t.completed) }

    default:
      return state
  }
}

export default tasksReducer