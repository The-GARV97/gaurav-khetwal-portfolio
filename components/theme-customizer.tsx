'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, RotateCcw, X } from 'lucide-react'
import { useTheme, presetValues, type Appearance, type Preset } from './theme-provider'

const presets: Array<{ id: Preset; label: string }> = [
  { id: 'ocean', label: 'Ocean' },
  { id: 'sage', label: 'Sage' },
  { id: 'coral', label: 'Coral' },
  { id: 'violet', label: 'Violet' },
  { id: 'graphite', label: 'Graphite' },
]

export function ThemeCustomizer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { appearance, preset, customAccent, resolvedAppearance, setAppearance, setPreset, setCustomAccent, resetTheme } = useTheme()

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="theme-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="theme-panel" role="dialog" aria-modal="true" aria-labelledby="appearance-title" initial={{ y: 24, opacity: 0, scale: .98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0, scale: .98 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
            <div className="theme-panel-head">
              <div><span className="eyebrow">Appearance</span><h3 id="appearance-title">Tune your workspace</h3><p className="theme-copy">Pick a quiet material palette and preview it live.</p></div>
              <button className="modal-close" onClick={onClose} aria-label="Close appearance settings"><X size={17} /></button>
            </div>
            <div className="theme-control">
              <span className="theme-label">Mode</span>
              <div className="segmented-control" role="radiogroup" aria-label="Color mode">
                {(['light', 'dark', 'system'] as Appearance[]).map((option) => <button key={option} className={appearance === option ? 'selected' : ''} role="radio" aria-checked={appearance === option} onClick={() => setAppearance(option)}>{option}</button>)}
              </div>
            </div>
            <div className="theme-control">
              <span className="theme-label">Accent</span>
              <div className="preset-grid">
                {presets.map((option) => <button key={option.id} className={`preset ${preset === option.id && !customAccent ? 'selected' : ''}`} onClick={() => setPreset(option.id)} aria-label={`Use ${option.label} accent`}><span style={{ background: presetValues[option.id] }} />{preset === option.id && !customAccent ? <Check size={11} aria-hidden="true" /> : <small>{option.label}</small>}</button>)}
              </div>
              <div className="custom-accent">
                <label htmlFor="accent-color"><input id="accent-color" type="color" value={customAccent ?? presetValues[preset]} onChange={(event) => setCustomAccent(event.target.value)} />Custom color</label>
                <input aria-label="Custom accent intensity" type="range" min="0" max="100" defaultValue="100" />
              </div>
            </div>
            <div className="theme-preview"><span className="preview-dot" /><div><b>{resolvedAppearance === 'dark' ? 'Night workspace' : 'Day workspace'}</b><small>Soft surfaces, readable contrast, less visual noise.</small></div><span className="preview-button">Aa</span></div>
            <button className="reset-theme" onClick={resetTheme}><RotateCcw size={12} /> Reset to system defaults</button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
