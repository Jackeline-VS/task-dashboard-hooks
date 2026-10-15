const FILTROS = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendientes' },
  { id: 'completed', label: 'Completadas' },
]

function Toolbar({ search, onSearch, filter, onFilter, sort, onSort }) {
  return (
    <div className="toolbar">
      <input
        className="input"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="🔍 Buscar tarea..."
      />
      <div className="toolbar-row">
        <div className="chips">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? 'active' : ''}`}
              onClick={() => onFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select className="select" value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="recent">Más recientes</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
          <option value="priority">Prioridad</option>
        </select>
      </div>
    </div>
  )
}

export default Toolbar