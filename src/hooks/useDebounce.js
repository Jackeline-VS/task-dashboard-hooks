import { useEffect, useState } from 'react'

// Hook personalizado: retrasa la actualización de un valor hasta que el usuario deja de escribir
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    // Cleanup: si el valor cambia antes del delay, se cancela el timer anterior
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}