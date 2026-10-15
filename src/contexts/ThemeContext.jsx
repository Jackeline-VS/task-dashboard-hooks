import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ThemeContext } from './theme'

export function ThemeProvider({ children }) {
  // El tema se inicializa desde localStorage (o 'light' por defecto)
  const [theme, setTheme] = useLocalStorage('taskhub-theme', 'light')

  // useEffect: aplica la clase al <body> y la limpia antes del siguiente cambio
  useEffect(() => {
    document.body.classList.add(theme)
    return () => document.body.classList.remove(theme) // cleanup
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}