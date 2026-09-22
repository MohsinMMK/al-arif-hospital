import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'motion/react'
import { Dialog } from 'radix-ui'
import { ArrowRight, ArrowUpRight, Check, MapPin, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { pageCatalog } from './data'

import { InteractionMotion } from './interaction-context'
export function ReadingProgress() {
  const enabled = useContext(InteractionMotion)
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 35 })
  return <motion.div className="mp-reading-progress" aria-hidden="true" style={{scaleX:enabled?smooth:scrollYProgress}}/>
}

const quickPages = pageCatalog.filter(page=>['Service detail','Doctor profile','Education','Patient information','Research'].includes(page.kind))
export function QuickFind() {
 const [open,setOpen]=useState(false)
 const [query,setQuery]=useState('')
 const input=useRef<HTMLInputElement>(null)
 const results=quickPages.filter(page=>`${page.title} ${page.description}`.toLowerCase().includes(query.toLowerCase().trim()))
 useEffect(()=>{const key=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key==='k'){event.preventDefault();setOpen(previous=>!previous)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[])
 const updateOpen=(value:boolean)=>{setOpen(value);if(!value)setQuery('')}
 return <Dialog.Root open={open} onOpenChange={updateOpen}><Dialog.Trigger asChild><button className="mp-find-trigger" aria-label="Search hospital pages" title="Search hospital pages"><Search size={19} aria-hidden="true"/></button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="mp-search-overlay"/><Dialog.Content className="mp-search-dialog" onOpenAutoFocus={event=>{event.preventDefault();input.current?.focus()}}><div className="mp-search-heading"><Dialog.Title>Where would you like to go?</Dialog.Title><Dialog.Close aria-label="Close search"><X size={21}/></Dialog.Close></div><Dialog.Description>Find a service, doctor or visiting information.</Dialog.Description><div className="mp-search"><Search size={18}/><Input ref={input} aria-label="Search hospital" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Try Unani, a doctor’s name, or visit…"/></div><div className="mp-quick-results"><p role="status">{results.length} {results.length===1?'page':'pages'} found</p>{results.length?results.map(page=><Link key={page.path} to={page.path} onClick={()=>updateOpen(false)}><span>{page.title}<small>{page.kind}</small></span><ArrowUpRight size={18}/></Link>):<div className="mp-no-results"><p>No match. Try a service name or browse all care.</p><Link to="/site/services" onClick={()=>updateOpen(false)}>Explore all services <ArrowRight size={17}/></Link></div>}</div><div className="mp-search-tip">Tab to move · Enter to open · Esc to close</div></Dialog.Content></Dialog.Portal></Dialog.Root>
}

const checklist=['Relevant reports & prescriptions','A list of current medicines','Questions for your clinician']
export function VisitChecklist() {
 const [checked,setChecked]=useState<string[]>([])
 return <section className="mp-visit-checklist"><div><h2>A little preparation.<br/><em>A calmer visit.</em></h2><p>Tick what’s ready. This list stays on this page.</p><span role="status">{checked.length} of {checklist.length} ready{checked.length===checklist.length?' — you’ve covered the basics.':''}</span><div className="mp-checklist-track" aria-hidden="true"><span style={{transform:`scaleX(${checked.length/checklist.length})`}}/></div></div><div>{checklist.map(label=><label key={label} className={checked.includes(label)?'is-checked':''}><input type="checkbox" checked={checked.includes(label)} onChange={event=>setChecked(current=>event.target.checked?[...current,label]:current.filter(item=>item!==label))}/><span className="mp-check-box" aria-hidden="true"><Check size={16}/></span><span>{label}</span></label>)}<Link className="mp-text-link" to="/site/request">Plan an inquiry<ArrowUpRight size={16}/></Link></div></section>
}

export function LocationShortcut(){return <Link className="mp-location-shortcut" to="/site/visit"><MapPin size={16}/><span>Bandlaguda, Hyderabad</span><span>Directions<ArrowUpRight size={15}/></span></Link>}
