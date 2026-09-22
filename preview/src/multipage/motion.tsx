import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { AnimationItem } from 'lottie-web'
gsap.registerPlugin(ScrollTrigger, useGSAP)


export function Chapter({ children, path, motionEnabled }: {children:React.ReactNode;path:string;motionEnabled:boolean}) {
  const root=useRef<HTMLDivElement>(null)
  useGSAP(()=>{
    const main=root.current
    if(!main) return
    if(motionEnabled) gsap.fromTo(main,{x:10,opacity:.72},{x:0,opacity:1,duration:.48,ease:'sine.inOut',clearProps:'transform,opacity'})
  },{scope:root,dependencies:[path,motionEnabled],revertOnUpdate:true})
  return <div ref={root} className="mp-chapter">{children}</div>
}

const transform={o:{a:0,k:100},r:{a:0,k:0},p:{a:0,k:[0,0,0]},a:{a:0,k:[0,0,0]},s:{a:0,k:[100,100,100]}}
const line={ty:'sh',ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[55,60],[665,60]],c:false}},nm:'Visit path'}
const color=[.145,.298,.239,1]
const journeyAnimation={v:'5.12.2',fr:30,ip:0,op:91,w:720,h:120,nm:'Al-Arif visit journey — original geometric motion',ddd:0,assets:[],layers:[
 {ddd:0,ind:1,ty:4,nm:'Progress',sr:1,ks:transform,ao:0,shapes:[line,{ty:'st',c:{a:0,k:color},o:{a:0,k:100},w:{a:0,k:3},lc:2,lj:2},{ty:'tm',s:{a:0,k:0},e:{a:1,k:[{t:0,s:[0],e:[100],o:{x:[.33],y:[.33]},i:{x:[.67],y:[.67]}},{t:90,s:[100]}]},o:{a:0,k:0},m:1}],ip:0,op:91,st:0,bm:0},
 ...[55,360,665].map((x,index)=>({ddd:0,ind:index+2,ty:4,nm:`Step ${index+1}`,sr:1,ks:transform,ao:0,shapes:[{ty:'el',p:{a:0,k:[x,60]},s:{a:0,k:[20,20]}},{ty:'fl',c:{a:0,k:color},o:{a:0,k:100}}],ip:0,op:91,st:0,bm:0})),
 {ddd:0,ind:5,ty:4,nm:'Moving marker',sr:1,ks:{...transform,p:{a:1,k:[{t:0,s:[55,60,0],e:[665,60,0],o:{x:.33,y:.33},i:{x:.67,y:.67}},{t:90,s:[665,60,0]}]}},ao:0,shapes:[{ty:'el',p:{a:0,k:[0,0]},s:{a:0,k:[38,38]}},{ty:'st',c:{a:0,k:color},o:{a:0,k:100},w:{a:0,k:2}}],ip:0,op:91,st:0,bm:0}
]}

export function VisitJourney({motionEnabled}:{motionEnabled:boolean}) {
 const section=useRef<HTMLElement>(null)
 const container=useRef<HTMLDivElement>(null)
 useEffect(()=>{
  let disposed=false
  let animation:AnimationItem|undefined
  let trigger:ScrollTrigger|undefined
  void import('lottie-web/build/player/lottie_light').then(({default:lottie})=>{
   if(disposed||!container.current) return
   animation=lottie.loadAnimation({container:container.current,renderer:'svg',loop:false,autoplay:false,animationData:structuredClone(journeyAnimation)})
   const ready=()=>{
    if(disposed||!animation) return
    container.current?.setAttribute('data-lottie-ready','true')
    if(!motionEnabled){animation.goToAndStop(90,true);return}
    trigger=ScrollTrigger.create({trigger:section.current,start:'top 85%',end:'bottom 35%',onUpdate:self=>{animation?.goToAndStop(self.progress*90,true);container.current?.setAttribute('data-frame',String(Math.round(self.progress*90)))}})
    trigger.refresh()
   }
   if(animation.isLoaded) ready();else animation.addEventListener('DOMLoaded',ready)
  }).catch((error:unknown)=>{console.error('Visit journey animation could not load; static steps remain available.',error)})
  return()=>{disposed=true;trigger?.kill();animation?.destroy()}
 },[motionEnabled])
 return <section className="mp-journey mp-section" ref={section}><div className="mp-section-heading"><h2>A visit, made<br /><em>a little simpler.</em></h2><p>From choosing your care to arriving at the hospital, know what happens next.</p></div><div className="mp-journey-line" ref={container} aria-hidden="true"/><ol className="mp-journey-steps"><li><span>1</span><h3>Find your care</h3><p>Explore a service and the team associated with it.</p></li><li><span>2</span><h3>Speak with reception</h3><p>Discuss a preferred day. The team confirms availability.</p></li><li><span>3</span><h3>Arrive prepared</h3><p>Bring relevant reports and follow the team’s guidance.</p></li></ol></section>
}
