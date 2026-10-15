const PESO = { alta: 0, media: 1, baja: 2 }

// Filtra (estado + búsqueda) y ordena sin mutar el arreglo original
export function procesarTareas(tasks, filter, sort, search) {
  const texto = search.trim().toLowerCase()

  const filtradas = tasks.filter((t) => {
    const coincideEstado =
      filter === 'all' || (filter === 'completed' ? t.completed : !t.completed)
    return coincideEstado && t.title.toLowerCase().includes(texto)
  })

  const copia = [...filtradas]
  switch (sort) {
    case 'asc':
      return copia.sort((a, b) => a.title.localeCompare(b.title))
    case 'desc':
      return copia.sort((a, b) => b.title.localeCompare(a.title))
    case 'priority':
      return copia.sort((a, b) => PESO[a.priority] - PESO[b.priority])
    default:
      return copia.sort((a, b) => b.createdAt - a.createdAt)
  }
}