import React,{useEffect,useMemo,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import{Canvas,useFrame}from'@react-three/fiber';
import{Stars}from'@react-three/drei';
import*as THREE from'three';
import{AnimatePresence,motion}from'framer-motion';
import{ArrowLeft,ArrowRight,Expand,Pause,Play,RotateCcw,Volume2,VolumeX,X}from'lucide-react';
import{chapters,flowers,loveLetter,memories,siteConfig}from'./story';
import{BotanicalGarden}from'./flowers';
import{PeonyIntro}from'./PeonyIntro';
import{MagicalFlowers}from'./MagicalFlowers';
import'./style.css';

const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function AmbientParticles({opening=false}){
 const group=useRef();const points=useMemo(()=>Array.from({length:opening?80:42},(_,i)=>({x:(Math.random()-.5)*16,y:(Math.random()-.5)*10,z:(Math.random()-.5)*9,s:.018+Math.random()*.055,o:.18+Math.random()*.5,i})),[opening]);
 useFrame(({clock},d)=>{if(!group.current)return;group.current.rotation.y+=d*.018;group.current.children.forEach((m,i)=>{m.position.y+=Math.sin(clock.elapsedTime*.5+i)*.0008})});
 return <group ref={group}>{points.map(v=><mesh key={v.i} position={[v.x,v.y,v.z]}><sphereGeometry args={[v.s,6,6]}/><meshBasicMaterial color={v.i%4===0?'#e7c783':'#e8a9b5'} transparent opacity={v.o}/></mesh>)}</group>
}
function Petal({index,total,time}){
 const pivot=useRef(),mesh=useRef();const angle=index/total*Math.PI*2;const ring=index>=8?1:0;const local=Math.max(0,Math.min(1,(time-(7.2+index*.16))/5));const p=ease(local);
 useFrame(()=>{if(!pivot.current||!mesh.current)return;pivot.current.rotation.x=1.34-p*1.15;pivot.current.rotation.y=Math.sin(time*.45+index)*.035;const s=.08+p*(ring?.78:1);mesh.current.scale.set(.62*s,1.28*s,.16*s)});
 return <group ref={pivot} rotation={[1.34,0,angle]}><mesh ref={mesh} position={[0,ring?.48:.34,0]} scale={.08} rotation={[.12,0,0]}><sphereGeometry args={[.34,32,16]}/><meshPhysicalMaterial color={ring?'#d989a7':'#f3b5c5'} emissive="#8b2f55" emissiveIntensity={.25+p*.55} roughness={.3} clearcoat={.4} transparent opacity={.72+p*.25}/></mesh></group>
}
function OpeningFlower({time}){
 const flower=useRef();const seed=Math.max(0,Math.min(1,(time-4)/3));const bloom=Math.max(0,Math.min(1,(time-7)/6));
 useFrame(({clock})=>{if(!flower.current)return;flower.current.rotation.y=Math.sin(clock.elapsedTime*.35)*.18;flower.current.position.y=Math.sin(clock.elapsedTime*.7)*.035;flower.current.scale.setScalar(.18+seed*.55+bloom*.32)});
 return <group ref={flower} position={[0,-.15,0]} scale={.08}>{Array.from({length:14},(_,i)=><Petal key={i} index={i} total={i<8?8:6} time={time}/>)}
 <mesh><sphereGeometry args={[.19,24,24]}/><meshStandardMaterial color="#f4d58b" emissive="#f0b95c" emissiveIntensity={1.4+bloom*2}/></mesh>
 <pointLight intensity={2+bloom*24} distance={7} color="#f4a8bd"/></group>
}
function PulseRings({time}){
 const rings=useRef([]);useFrame(()=>rings.current.forEach((m,i)=>{if(!m)return;const p=((time-i*.72)%1.75)/1.75;m.scale.setScalar(.2+p*3.3);m.material.opacity=(1-p)*.28}));
 return <group>{[0,1,2].map((_,i)=><mesh key={i} ref={m=>rings.current[i]=m}><ringGeometry args={[.24,.255,64]}/><meshBasicMaterial color="#f0a3ba" transparent opacity={0} side={THREE.DoubleSide}/></mesh>)}</group>
}
function OpeningWorld({time,quality,postprocessing,debugCamera}){
 return <><color attach="background" args={['#03040a']}/><fog attach="fog" args={['#070812',6,19]}/><Stars radius={58} depth={42} count={time<3?80:1100} factor={2.4} fade speed={.2}/><AmbientParticles opening/><PeonyIntro quality={quality} postprocessing={postprocessing} debugCamera={debugCamera}/></>
}function StoryWorld(){return <><color attach="background" args={['#070812']}/><fog attach="fog" args={['#070812',7,22]}/><ambientLight intensity={1}/><pointLight position={[3,2,3]} intensity={18} color="#e8a9b5"/><Stars radius={50} depth={35} count={1400} factor={3} fade speed={.35}/><AmbientParticles/></>}
function Universe({opening,time,quality,postprocessing,debugCamera}){return <Canvas dpr={[1,1.6]} gl={{antialias:true}} camera={{position:[0,.15,5],fov:42}}>{opening?<OpeningWorld time={time} quality={quality} postprocessing={postprocessing} debugCamera={debugCamera}/>:<StoryWorld/>}</Canvas>}
function Opening({time,entering,onEnter}){
 const[replay,setReplay]=useState(0);
 const move=e=>{const rect=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',(((e.clientX-rect.left)/rect.width-.5)*18)+'px');e.currentTarget.style.setProperty('--my',(((e.clientY-rect.top)/rect.height-.5)*10)+'px')};
 return <section className={'opening '+(entering?'is-entering':'')} onPointerMove={move}>
  <button className="magical-stage" key={replay} onClick={()=>setReplay(v=>v+1)} aria-label="Replay the magical flower bloom">
   <MagicalFlowers/>
   <small>Touch the flowers to bloom again</small>
  </button>
  <motion.div className="opening-reveal" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:1.15,ease:[.2,.8,.2,1]}}>
   <p>Hey, Mommy...</p><p>I made a little universe for you.</p><span>Happy 8th Monthsary, My Love.</span><h1>Eternally,<br/><em>Mommy {'\u2661'}</em></h1><button className="primary" onClick={onEnter}>Enter Our Universe {'\u2661'}</button>
  </motion.div>
 </section>
}
function Controls({scene,paused,setPaused,sound,setSound,prev,next}){return <div className="controls"><button onClick={prev} aria-label="Previous"><ArrowLeft/></button><button onClick={()=>setPaused(v=>!v)} aria-label={paused?'Resume':'Pause'}>{paused?<Play/>:<Pause/>}</button><button onClick={next} aria-label="Next"><ArrowRight/></button><i/><button onClick={()=>setSound(v=>!v)} aria-label="Music">{sound?<Volume2/>:<VolumeX/>}</button><span>{String(scene+1).padStart(2,'0')} / 08</span></div>}
function MemoryScene({open}){return <div className="memory-rail">{memories.map((m,i)=><motion.button key={m.src} className="memory-frame" onClick={()=>open(i)} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*.04}}><img src={m.src} alt={m.caption}/><span>{m.caption}</span><Expand/></motion.button>)}</div>}
function BlossomIcon({index,open}){return <span className={'css-flower f'+index+(open?' bloomed':'')}><i/><i/><i/><i/><i/><b/></span>}
function FlowerScene(){return <BotanicalGarden flowers={flowers}/>}
function LetterScene(){const[open,setOpen]=useState(false);return open?<motion.div className="letter" initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}}><button onClick={()=>setOpen(false)}><X/></button><h3>My dearest Mommy,</h3>{loveLetter.split('\n\n').slice(1).map((p,i)=><p key={i}>{p}</p>)}</motion.div>:<button className="envelope" onClick={()=>setOpen(true)}><span>{'\u2661'}</span> Open Daddy's letter</button>}
function Promise({replay}){const[go,setGo]=useState(false);return <div className={'promise '+(go?'begun':'')}><div className="linked-stars"><i/><span/><i/></div>{!go?<button className="primary" onClick={()=>setGo(true)}>Begin our promise <ArrowRight/></button>:<motion.div className="promise-copy" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5,duration:2}}><h2>Someday, I'll catch up to you.</h2><p>I promise, Mommy.</p><p>Forever your Daddy.</p><em>To Be Continued... {'\u2661'}</em><button className="replay" onClick={replay}><RotateCcw/> Relive our story</button></motion.div>}</div>}
function App(){
 const sceneParam=new URLSearchParams(location.search).get('scene');
 const[entered,setEntered]=useState(sceneParam!==null),[openingTime,setOpeningTime]=useState(0),[entering,setEntering]=useState(false),[scene,setScene]=useState(sceneParam===null?0:Math.max(0,Math.min(7,parseInt(sceneParam,10)||0))),[paused,setPaused]=useState(false),[sound,setSound]=useState(sceneParam===null),[photo,setPhoto]=useState(null);const audio=useRef(),active=chapters[scene],next=()=>setScene(s=>Math.min(7,s+1)),prev=()=>setScene(s=>Math.max(0,s-1));
 useEffect(()=>{if(entered)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const started=performance.now();const id=setInterval(()=>setOpeningTime(reduced?24.5:(performance.now()-started)/1000),100);return()=>clearInterval(id)},[entered]);
 useEffect(()=>{if(!entered||paused||active.hold||photo!==null)return;const t=setTimeout(next,siteConfig.sceneDuration);return()=>clearTimeout(t)},[entered,paused,scene,photo]);
 useEffect(()=>{if(!audio.current)return;audio.current.volume=siteConfig.defaultMusicVolume;if(sound){if(audio.current.currentTime>=siteConfig.musicCutoffSeconds)audio.current.currentTime=0;audio.current.play().catch(()=>setSound(false))}else audio.current.pause()},[sound]);
 useEffect(()=>{if(entered)return;const startIntroMusic=()=>{if(!audio.current||!audio.current.paused)return;if(audio.current.currentTime>=siteConfig.musicCutoffSeconds)audio.current.currentTime=0;setSound(true);audio.current.play().catch(()=>setSound(false))};window.addEventListener('pointerdown',startIntroMusic,{once:true});window.addEventListener('keydown',startIntroMusic,{once:true});return()=>{window.removeEventListener('pointerdown',startIntroMusic);window.removeEventListener('keydown',startIntroMusic)}},[entered]);
 useEffect(()=>{const f=()=>document.hidden&&setPaused(true);document.addEventListener('visibilitychange',f);return()=>document.removeEventListener('visibilitychange',f)},[]);
 const enter=()=>{setEntering(true);setSound(true);setTimeout(()=>{setEntered(true);setEntering(false)},1800)};
 const enforceMusicCutoff=e=>{if(e.currentTarget.currentTime>=siteConfig.musicCutoffSeconds){e.currentTarget.pause();e.currentTarget.currentTime=siteConfig.musicCutoffSeconds;setSound(false)}};
 return <main className={'tone-'+(entered?active.tone:'intro')}><audio ref={audio} src={siteConfig.musicPath} preload="auto" onTimeUpdate={enforceMusicCutoff} onEnded={()=>setSound(false)}/><div className={'universe '+(entering?'traveling':'')}><Universe opening={!entered} time={openingTime} quality="high" postprocessing={true} debugCamera="desktop"/></div><div className="atmosphere"/>
 {!entered?<Opening time={openingTime} entering={entering} onEnter={enter}/>:<><header><button className="brand" onClick={()=>{setEntered(false);setOpeningTime(24.5)}}>Eternally, Mommy {'\u2661'}</button><Controls {...{scene,paused,setPaused,sound,setSound,prev,next}}/></header><div className="timeline"><span style={{width:`${(scene+1)*12.5}%`}}/></div><AnimatePresence mode="wait"><motion.section key={scene} className={'chapter chapter-'+(active.kind||'story')} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.75}}><div className="chapter-copy"><span>Chapter {active.number}</span><h1>{active.title}</h1><h2>{active.subtitle}</h2><p>{active.message}</p>{active.kind==='photos'&&<small>Choose a photograph to hold it closer.</small>}{active.hold&&active.kind!=='promise'&&<button className="continue" onClick={next}>Continue our story <ArrowRight/></button>}</div>{active.kind==='photos'&&<MemoryScene open={setPhoto}/>} {active.kind==='flowers'&&<FlowerScene/>} {active.kind==='letter'&&<LetterScene/>} {active.kind==='promise'&&<Promise replay={()=>{setScene(0);setPaused(false)}}/>}</motion.section></AnimatePresence><nav className="dots">{chapters.map((c,i)=><button key={c.id} className={i===scene?'active':''} onClick={()=>setScene(i)} aria-label={c.title}/>)}</nav></>}
 {photo!==null&&<div className="viewer" role="dialog"><button className="close" onClick={()=>setPhoto(null)}><X/></button><button onClick={()=>setPhoto((photo+12)%13)}><ArrowLeft/></button><figure><img src={memories[photo].src} alt={memories[photo].caption}/><figcaption>{memories[photo].caption}</figcaption></figure><button onClick={()=>setPhoto((photo+1)%13)}><ArrowRight/></button></div>}</main>
}
createRoot(document.getElementById('root')).render(<App/>);







