import { useEffect, useState } from 'react'

let push = () => {}
export const toast = (msg) => push(msg)

export default function Toaster() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    let t
    push = (m) => {
      setMsg(m)
      clearTimeout(t)
      t = setTimeout(() => setMsg(null), 2800)
    }
  }, [])
  return msg ? <div className="toast" role="status">{msg}</div> : null
}
