// Tiny localStorage-backed store for captured leads (phone numbers, newsletter
// emails, contact messages). In production, post these to a CRM / Google Sheet.
import { useSyncExternalStore } from 'react'

const KEY = 'voiceroom-leads-v1'
const listeners = new Set()

let state = (() => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { leads: [] }
})()

export const store = {
  get: () => state,
  set(updater) {
    state = { ...state, ...updater(state) }
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
    listeners.forEach((l) => l())
  },
  subscribe(l) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
}

export const useStore = (selector = (s) => s) =>
  selector(useSyncExternalStore(store.subscribe, store.get))

export const addLead = (kind, value, source) =>
  store.set((s) => ({ leads: [{ kind, value, source, at: new Date().toISOString() }, ...s.leads] }))
