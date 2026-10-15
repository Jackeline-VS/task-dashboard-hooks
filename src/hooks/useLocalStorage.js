import { useEffect, useState } from 'react'

// Hook personalizado reutilizable: estado sincronizado con localStorage
// Recibe key y defaultValue, retorna [value, setValue] igual que useState
export function useLocalStorage(key, defaultValue) {
  // Inicialización perezosa: lee localStorage solo en el primer render
  const [value, setValue] = useState(() => {
    try {
      const guardado = localStorage.getItem(key)
      return guardado !== null ? JSON.parse(guardado) : defaultValue
    } catch {
      return defaultValue
    }
  })

  // Efecto 1: cada vez que cambia el valor, se guarda en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // almacenamiento lleno o bloqueado: se ignora
    }
  }, [key, value])

  // Efecto 2: sincroniza entre pestañas abiertas + CLEANUP del listener
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch {
          // valor inválido: se ignora
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    // Cleanup: elimina el listener al desmontar (evita memory leaks)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [value, setValue]
}