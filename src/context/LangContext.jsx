import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('sz-lang') || 'en'
  })

  const toggle = () => {
    const next = lang === 'en' ? 'fr' : 'en'
    localStorage.setItem('sz-lang', next)
    setLang(next)
  }

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
