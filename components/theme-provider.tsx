'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Appearance = 'light' | 'dark' | 'system'
type Preset = 'ocean' | 'sage' | 'coral' | 'violet' | 'graphite'

type ThemeContextValue = {
  appearance: Appearance
  preset: Preset
  customAccent: string | null
  resolvedAppearance: 'light' | 'dark'
  setAppearance: (value: Appearance) => void
  setPreset: (value: Preset) => void
  setCustomAccent: (value: string | null) => void
  resetTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const defaultPreset: Preset = 'ocean'
const presetValues: Record<Preset, string> = { ocean: '#4f7ee8', sage: '#5d9b82', coral: '#dc8069', violet: '#866ee5', graphite: '#66758c' }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearanceState] = useState<Appearance>('system')
  const [preset, setPresetState] = useState<Preset>(defaultPreset)
  const [customAccent, setCustomAccentState] = useState<string | null>(null)
  const [resolvedAppearance, setResolvedAppearance] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const storedAppearance = window.localStorage.getItem('gk-appearance') as Appearance | null
    const storedPreset = window.localStorage.getItem('gk-preset') as Preset | null
    const storedAccent = window.localStorage.getItem('gk-accent')
    const nextAppearance = storedAppearance === 'light' || storedAppearance === 'dark' || storedAppearance === 'system' ? storedAppearance : 'system'
    const nextPreset = storedPreset && storedPreset in presetValues ? storedPreset : defaultPreset
    setAppearanceState(nextAppearance)
    setPresetState(nextPreset)
    setCustomAccentState(storedAccent && /^#[0-9a-f]{6}$/i.test(storedAccent) ? storedAccent : null)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setResolvedAppearance(nextAppearance === 'system' ? (media.matches ? 'dark' : 'light') : nextAppearance)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setResolvedAppearance(appearance === 'system' ? (media.matches ? 'dark' : 'light') : appearance)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [appearance])

  useEffect(() => {
    const root = document.documentElement
    const accent = customAccent ?? presetValues[preset]
    root.dataset.appearance = resolvedAppearance
    root.dataset.theme = preset
    root.style.setProperty('--accent-custom', accent)
    root.classList.toggle('dark', resolvedAppearance === 'dark')
  }, [resolvedAppearance, preset, customAccent])

  const value = useMemo<ThemeContextValue>(() => ({
    appearance,
    preset,
    customAccent,
    resolvedAppearance,
    setAppearance: (value) => { setAppearanceState(value); window.localStorage.setItem('gk-appearance', value) },
    setPreset: (value) => { setPresetState(value); setCustomAccentState(null); window.localStorage.setItem('gk-preset', value); window.localStorage.removeItem('gk-accent') },
    setCustomAccent: (value) => { setCustomAccentState(value); if (value) window.localStorage.setItem('gk-accent', value); else window.localStorage.removeItem('gk-accent') },
    resetTheme: () => { setAppearanceState('system'); setPresetState(defaultPreset); setCustomAccentState(null); window.localStorage.removeItem('gk-appearance'); window.localStorage.removeItem('gk-preset'); window.localStorage.removeItem('gk-accent') },
  }), [appearance, preset, customAccent, resolvedAppearance])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export { presetValues }
export type { Appearance, Preset }
