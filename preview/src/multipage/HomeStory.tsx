import { DoctorSpotlight } from '@/components/react-bits/DoctorSpotlight'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, BookOpen, Leaf, MapPin, Stethoscope } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InteractionMotion } from './interaction-context'
import { doctorPages, servicePages } from './data'
import { VisitJourney } from './motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)
function StoryLink({to,children}:{to:string;children:React.ReactNode}) {return <Link className="story-link" to={to}>{children}<ArrowUpRight size={19}/></Link>}

function CareChapter({unani=false}:{unani?:boolean}) {
 const root=useRef<HTMLElement>(null)
 const enabled=useContext(InteractionMotion)
 const services=servicePages.filter(service=>service.wing===(unani?'Unani care':'General hospital'))
 useGSAP(()=>{
  if(!enabled||!root.current)return
  const rows=gsap.utils.toArray<HTMLElement>('.story-care-feature',root.current)
  const line=root.current.querySelector('.story-care-line span')
  gsap.fromTo(line,{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:root.current.querySelector('.story-care-features'),start:'top 65%',end:'bottom 65%',scrub:.3}})
  rows.forEach(row=>{
   const accent=row.querySelector('.story-feature-wash')
   gsap.fromTo(accent,{clipPath:unani?'inset(0 0 0 100%)':'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.55,ease:'power3.out',scrollTrigger:{trigger:row,start:'top 72%',toggleActions:'play none none reverse'}})
   ScrollTrigger.create({trigger:row,start:'top 60%',end:'bottom 60%',toggleClass:'is-current'})
  })
 },{scope:root,dependencies:[enabled,unani],revertOnUpdate:true})
 return <section ref={root} id={unani?'unani-care':'general-care'} className={`story-care ${unani?'story-unani':'story-general'}`} aria-labelledby={unani?'unani-title':'general-title'}><div className="story-care-inner"><div className="story-care-intro"><div className="story-care-mark" aria-hidden="true">{unani?<Leaf size={50}/>:<Stethoscope size={50}/>}</div><h2 id={unani?'unani-title':'general-title'}>{unani?<>Unani care.<br/><em>Time to listen.</em></>:<>General hospital.<br/><em>Care for everyday life.</em></>}</h2><p>{unani?'A consultation starts with your health history, daily life and questions. Explore Unani medicine and the therapies described in the hospital brief.':'From everyday health concerns to women’s health and surgical consultations, find the service that fits the conversation you need.'}</p><StoryLink to={`/site/services?wing=${unani?'unani':'general'}`}>{unani?'Explore Unani care':'Explore general care'}</StoryLink><div className="story-care-footnote">{unani?'Your clinician discusses suitability before treatment.':'Reception helps confirm your clinician and visit.'}</div></div><div className="story-care-features"><div className="story-care-line" aria-hidden="true"><span/></div>{services.map(service=><article className="story-care-feature" key={service.slug}><div className="story-feature-wash" aria-hidden="true"/><Link to={`/site/services/${service.slug}`}><h3>{service.name}</h3><ArrowUpRight size={22}/></Link><p>{service.intro}</p></article>)}</div></div></section>
}

export default function HomeStory(){
 const enabled=useContext(InteractionMotion)
 return <div className="home-story">
  <section className="story-hero"><div><h1>Care that feels<br/><em>close to home.</em></h1><p>Al-Arif brings general hospital care and Unani medicine<br className="story-desktop-break"/> together in Bandlaguda, Hyderabad.</p><a className="story-scroll-link" href="#general-care">Discover your care<ArrowDown size={18}/></a></div><div className="story-hero-ground"><span><Stethoscope size={21}/>General hospital</span><span><Leaf size={21}/>Unani care</span><Link to="/site/visit"><MapPin size={18}/>Plan your visit<ArrowUpRight size={16}/></Link></div></section>
  <section className="story-about story-section" id="hospital"><h2>A hospital in your neighbourhood.<br/><em>A welcome for your family.</em></h2><div><p>Here in Bandlaguda, Al-Arif brings two approaches to care into one institution: general hospital services and Unani consultations.</p><p>Get to know the hospital, its community roots and the people who help you take the next step.</p><StoryLink to="/site/about">The story of Al-Arif</StoryLink></div></section>
  <CareChapter/><CareChapter unani/>
  <section className="story-doctors story-section" id="care-team"><div className="story-section-intro"><h2>Meet our doctors.<br/><em>A person to speak with.</em></h2><p>Find a clinician and explore their care. Reception confirms current consultation arrangements.</p></div><div className="story-doctor-gallery">{doctorPages.map(doctor=><DoctorSpotlight key={doctor.slug} doctor={doctor}/>)}</div><StoryLink to="/site/doctors">Explore the care team</StoryLink><small className="story-doctor-note">Contact reception for current clinician schedules and consultation details.</small></section>
  <section className="story-learning" id="learning"><div className="story-learning-inner"><div className="story-learning-title"><BookOpen size={42} aria-hidden="true"/><h2>A place to care.<br/><em>A place to learn.</em></h2></div><div className="story-learning-copy"><p>Explore how supervised observation, workshops and academic visits could support learning at Al-Arif.</p><h3>Clinical observation</h3><p>Explore the planned learning scope, supervision and details to confirm before applying.</p><small>Programme details and intakes are not yet confirmed. Applications are not open.</small><StoryLink to="/site/education">Explore education & learning</StoryLink><Link className="story-secondary-link" to="/site/education/clinical-observation">Explore clinical observation<ArrowUpRight size={16}/></Link></div></div></section>
  <section className="story-research story-section" id="research"><div><h2>Questions that lead<br/><em>to understanding.</em></h2><p>The research section brings together the hospital’s proposed academic themes and a future home for verified publications.</p><StoryLink to="/site/research">Explore research & publications</StoryLink></div><div className="story-research-themes"><h3>Research interests</h3><ul><li>Unani clinical practice</li><li>Formulation standardization</li><li>Observational care studies</li><li>Academic exchange</li></ul><small>Publication records will appear when available.</small></div></section>
  <section className="story-visit" id="visiting" aria-label="Planning your visit"><VisitJourney motionEnabled={enabled}/><div className="story-visit-details"><div><h3>Find us in Bandlaguda.</h3><p>Chandrayangutta, Hyderabad.<br/>Near Dargah Hazrat Syed Noori Shah Sahab.</p><StoryLink to="/site/visit">Directions & visit information</StoryLink></div><div><h3>Let’s plan your next step.</h3><p>Check the service, clinician and timing with reception before you travel.</p><StoryLink to="/site/request">Plan an inquiry</StoryLink><small>Preview only. No appointment is booked online.</small></div></div></section>
 </div>
}
