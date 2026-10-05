// Tiny localStorage-backed store so the prototype "remembers" bookings, leads and
// admin edits across pages. Swap for real API calls when the backend exists.
import { useSyncExternalStore } from 'react'
import { EVENTS, POSTS } from '../data'

const KEY = 'miyagi-prototype-v1'
const listeners = new Set()

const seed = () => ({
  events: EVENTS,
  posts: POSTS.map((p) => ({ ...p, published: true })),
  registrations: [
    { id: 'MYG-24081', event: 'open-mic-october', name: 'Riya Sharma', email: 'riya@example.com', phone: '98110 22334', qty: 1, amount: 499, at: '2026-10-01T10:12:00' },
    { id: 'MYG-24082', event: 'debate-league-s3', name: 'Vasant Valley School', email: 'debate@vvs.example', phone: '98100 45566', qty: 2, amount: 2998, at: '2026-10-02T15:40:00' },
    { id: 'MYG-24083', event: 'speak-up-bootcamp', name: 'Arjun Nair', email: 'arjun@example.com', phone: '99990 11223', qty: 1, amount: 3999, at: '2026-10-03T09:05:00' },
  ],
  leads: [
    { kind: 'phone', value: '+91 98765 43210', source: 'Welcome popup', at: '2026-10-04T18:22:00' },
    { kind: 'enquiry', value: 'Pooja (DPS) — Debating for Grade 9', source: 'Programs / Debating', at: '2026-10-04T11:02:00' },
    { kind: 'newsletter', value: 'meera@example.com', source: 'Footer', at: '2026-10-03T20:45:00' },
  ],
})

let state = (() => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return seed()
})()

const persist = () => {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
}

export const store = {
  get: () => state,
  set(updater) {
    state = { ...state, ...updater(state) }
    persist()
    listeners.forEach((l) => l())
  },
  reset() {
    state = seed()
    persist()
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
