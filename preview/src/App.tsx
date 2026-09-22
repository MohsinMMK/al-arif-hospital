import { lazy, Suspense } from 'react'
const Website = lazy(() => import('./multipage/Website'))
export default function App() {
  return <Suspense fallback={<p style={{padding:40}}>Opening Al-Arif…</p>}><Website /></Suspense>
}
