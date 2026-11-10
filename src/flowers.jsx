import React,{useMemo,useRef,useState}from'react';
import{useFrame}from'@react-three/fiber';
import*as THREE from'three';

const clamp=n=>Math.max(0,Math.min(1,n));
const smooth=n=>n*n*(3-2*n);

function petalShape(){
 const s=new THREE.Shape();
 s.moveTo(0,-.05);
 s.bezierCurveTo(-.12,.03,-.34,.28,-.31,.52);
 s.bezierCurveTo(-.28,.72,-.12,.86,0,.91);
 s.bezierCurveTo(.12,.86,.28,.72,.31,.52);
 s.bezierCurveTo(.34,.28,.12,.03,0,-.05);
 return s;
}
function CurvedPetal({angle,layer,index,time}){
 const hinge=useRef(),mesh=useRef();
 const geometry=useMemo(()=>{const g=new THREE.ExtrudeGeometry(petalShape(),{depth:.035,bevelEnabled:true,bevelSegments:4,steps:2,bevelSize:.025,bevelThickness:.018});g.center();return g},[]);
 const delay=layer===0?6.1:layer===1?7.1:8.1;
 const p=smooth(clamp((time-delay-index*.105)/4.2));
 const radius=[.23,.15,.08][layer],size=[1,.72,.48][layer];
 const colors=[['#c95f8b','#742b58'],['#ee9db6','#9a426c'],['#ffd3dc','#c46283']][layer];
 useFrame(({clock})=>{if(!hinge.current||!mesh.current)return;hinge.current.rotation.x=1.48-p*1.43;hinge.current.rotation.z=angle+Math.sin(clock.elapsedTime*.42+index)*.018*p;hinge.current.position.y=radius+p*.13;const q=Math.max(.001,p)*size;mesh.current.scale.set(q,q,q*(.88+p*.12));});
 return <group rotation={[0,0,angle]}><group ref={hinge}><mesh ref={mesh} geometry={geometry}><meshPhysicalMaterial color={colors[0]} emissive={colors[1]} emissiveIntensity={.3+p*.55} roughness={.32} metalness={.03} clearcoat={.65} clearcoatRoughness={.22} transmission={.08} thickness={.2} side={THREE.DoubleSide}/></mesh></group></group>
}
function Stamens({time}){
 const group=useRef();const p=smooth(clamp((time-9.4)/2.5));
 useFrame(({clock})=>{if(!group.current)return;group.current.scale.setScalar(Math.max(.001,p));group.current.rotation.z=Math.sin(clock.elapsedTime*.5)*.025});
 return <group ref={group}>{Array.from({length:22},(_,i)=>{const a=i/22*Math.PI*2,r=.16+(i%3)*.035,h=.18+(i%4)*.02;return <group key={i} rotation={[0,0,a]}><mesh position={[0,r,h/2]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.007,.009,h,6]}/><meshStandardMaterial color="#f4d7a0" emissive="#c68b3d" emissiveIntensity={.35}/></mesh><mesh position={[0,r+h*.45,h]}><sphereGeometry args={[.024,8,8]}/><meshStandardMaterial color="#ffd978" emissive="#f0a93e" emissiveIntensity={1.5}/></mesh></group>})}</group>
}
function LightRibbon({time}){
 const group=useRef();const p=clamp((time-3.5)/5);
 useFrame((_,d)=>{if(group.current){group.current.rotation.z+=d*.18;group.current.rotation.x+=d*.04}});
 return <group ref={group} scale={.65+p*.55}><mesh rotation={[1.12,.28,0]}><torusGeometry args={[.9,.012,10,120]}/><meshBasicMaterial color="#ef8fb3" transparent opacity={.12+p*.42}/></mesh><mesh rotation={[1.22,-.36,.8]}><torusGeometry args={[1.08,.006,8,120]}/><meshBasicMaterial color="#e7c783" transparent opacity={.08+p*.25}/></mesh></group>
}
function FlowerDust({time}){
 const refs=useRef([]);const dust=useMemo(()=>Array.from({length:34},(_,i)=>({a:i/34*Math.PI*2,r:.65+(i%7)*.085,z:(i%5-.2)*.08,s:.01+(i%3)*.005})),[]);
 useFrame(({clock})=>refs.current.forEach((m,i)=>{if(!m)return;const d=dust[i],a=d.a+clock.elapsedTime*(.16+(i%4)*.015);m.position.set(Math.cos(a)*d.r,Math.sin(a)*d.r,d.z+Math.sin(clock.elapsedTime+i)*.12)}));
 return <group>{dust.map((d,i)=><mesh key={i} ref={m=>refs.current[i]=m} scale={Math.max(.001,clamp((time-3-i*.03)/2))}><sphereGeometry args={[d.s,6,6]}/><meshBasicMaterial color={i%3?'#f2a8bf':'#f6dc91'} transparent opacity={.65}/></mesh>)}</group>
}
export function OpeningBloom({time}){
 const flower=useRef(),bud=useRef(),halo=useRef();const grow=smooth(clamp((time-2.6)/8.8));const full=clamp((time-10)/3);
 useFrame(({clock})=>{if(flower.current){const s=.16+grow*1.5;flower.current.scale.setScalar(s);flower.current.rotation.z=Math.sin(clock.elapsedTime*.28)*.035;flower.current.rotation.y=Math.sin(clock.elapsedTime*.22)*.08}if(bud.current){bud.current.material.opacity=1-clamp((time-6)/2.4);bud.current.scale.setScalar(.5+grow*.7)}if(halo.current){const wave=((time-10.5)%2.8)/2.8;halo.current.scale.setScalar(.6+wave*2.4);halo.current.material.opacity=full*(1-wave)*.24}});
 return <group><LightRibbon time={time}/><FlowerDust time={time}/><group ref={flower}>
  {Array.from({length:10},(_,i)=><CurvedPetal key={'o'+i} angle={i/10*Math.PI*2} layer={0} index={i} time={time}/>)}
  {Array.from({length:8},(_,i)=><CurvedPetal key={'m'+i} angle={(i+.5)/8*Math.PI*2} layer={1} index={i} time={time}/>)}
  {Array.from({length:6},(_,i)=><CurvedPetal key={'i'+i} angle={i/6*Math.PI*2} layer={2} index={i} time={time}/>)}
  <mesh ref={bud} scale={.5}><sphereGeometry args={[.24,24,24]}/><meshPhysicalMaterial color="#f19ab4" emissive="#e17c9e" emissiveIntensity={1.2} transparent opacity={1}/></mesh>
  <mesh><sphereGeometry args={[.14,24,24]}/><meshStandardMaterial color="#f8d27a" emissive="#efaa3c" emissiveIntensity={2.3}/></mesh><Stamens time={time}/>
 </group><mesh ref={halo}><ringGeometry args={[.48,.49,96]}/><meshBasicMaterial color="#f6c1d0" transparent opacity={0} side={THREE.DoubleSide}/></mesh></group>
}

const P=({d,fill='url(#pink)',className='petal'})=><path className={className} d={d} fill={fill}/>;
function Sakura(){return <><P d="M60 56C40 47 35 25 49 17c7-4 11 9 11 17 2-9 7-21 15-16 14 9 7 28-8 38 17-8 35 2 30 17-5 15-27 12-37-3-8 17-30 19-36 4-6-14 12-26 30-18-17-9-19-30-6-37 13-7 27 8 26 25z"/><circle cx="60" cy="60" r="9" fill="#f6ce72"/>{[0,45,90,135,180,225,270,315].map(a=><circle key={a} cx={60+Math.cos(a*Math.PI/180)*14} cy={60+Math.sin(a*Math.PI/180)*14} r="2" fill="#fff0b1"/>)}</>}
function Lily(){return <>{[0,60,120,180,240,300].map((a,i)=><path key={a} className="petal" d="M60 58C48 40 51 14 60 6c9 8 12 34 0 52z" fill="url(#ivory)" transform={'rotate('+a+' 60 60)'}/>)}{[15,105,195].map(a=><path key={a} d="M60 58L60 22" stroke="#d39b55" strokeWidth="2" transform={'rotate('+a+' 60 60)'}/>)}<circle cx="60" cy="60" r="8" fill="#f4c766"/></>}
function Sunflower(){return <>{Array.from({length:20},(_,i)=><path key={i} className="petal" d="M60 55C52 43 54 19 60 9c7 10 9 34 0 46z" fill="url(#gold)" transform={'rotate('+(i*18)+' 60 60)'}/>)}<circle cx="60" cy="60" r="19" fill="#6f3f2a"/>{Array.from({length:18},(_,i)=><circle key={i} cx={60+Math.cos(i*.9)*(i%3)*5} cy={60+Math.sin(i*.9)*(i%3)*5} r="2" fill="#d6943f"/>)}</>}
function Lavender(){return <><path d="M60 105C58 76 60 40 61 14" stroke="#72916b" strokeWidth="4" fill="none"/>{Array.from({length:13},(_,i)=><g key={i} transform={'translate('+(i%2?3:-3)+' '+(88-i*6)+') rotate('+(i%2?28:-28)+' 60 60)'}><ellipse className="petal" cx="60" cy="60" rx="8" ry="4.5" fill="url(#purple)"/></g>)}</>}
function Tulip(){return <><path d="M60 105V62" stroke="#5d8e65" strokeWidth="5"/><path d="M60 91C46 79 39 82 35 94 47 96 55 93 60 88" fill="#719e6a"/><P d="M60 65C35 64 29 39 36 20c9 4 16 12 24 23 8-11 16-20 25-23 7 21-2 44-25 45z" fill="url(#deepPink)"/><P d="M60 65C48 56 48 32 60 17c12 15 12 39 0 48z" fill="url(#pink)"/></>}
function Rose(){return <>{[0,50,100,150,200,250,300].map((a,i)=><path key={a} className="petal" d="M60 67C38 67 31 49 42 35 52 22 70 25 77 39 84 55 72 67 60 67z" fill={i%2?'url(#deepPink)':'url(#pink)'} transform={'rotate('+a+' 60 60) scale('+(1-i*.035)+')'}/>) }<path d="M60 65c-14-3-13-20-2-24 12-4 20 10 11 18-5 5-11 2-10-3" fill="none" stroke="#8c355a" strokeWidth="4"/></>}
function Hydrangea(){return <>{Array.from({length:17},(_,i)=>{const a=i*2.4,r=8+(i%4)*7,x=60+Math.cos(a)*r,y=58+Math.sin(a)*r;return <g key={i} transform={'translate('+(x-60)+' '+(y-60)+') scale(.5)'}><Sakura/></g>})}</>}
function BabysBreath(){return <><path d="M60 108C60 70 58 48 42 23M60 75C75 59 79 40 82 22M58 87C43 70 31 62 22 51" stroke="#78916f" strokeWidth="2.5" fill="none"/>{[[42,23],[82,22],[22,51],[50,39],[71,45],[34,61],[82,57]].map(([x,y],i)=><g key={i} transform={'translate('+(x-60)+' '+(y-60)+') scale(.32)'}><Sakura/></g>)}</>}
const species=[Sakura,Lily,Sunflower,Lavender,Tulip,Rose,Hydrangea,BabysBreath];
function Botanical({index,bloomed}){const Species=species[index];return <svg className={'botanical '+(bloomed?'is-bloomed':'')} viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="pink"><stop stopColor="#ffdbe3"/><stop offset="1" stopColor="#df809e"/></radialGradient><linearGradient id="deepPink" x2="0" y2="1"><stop stopColor="#f2a3ba"/><stop offset="1" stopColor="#b54270"/></linearGradient><linearGradient id="gold" x2="0" y2="1"><stop stopColor="#ffe68d"/><stop offset="1" stopColor="#e4a52f"/></linearGradient><linearGradient id="purple" x2="1" y2="1"><stop stopColor="#d5b9ef"/><stop offset="1" stopColor="#7652a6"/></linearGradient><linearGradient id="ivory" x2="0" y2="1"><stop stopColor="#fffdf4"/><stop offset="1" stopColor="#e7d5c8"/></linearGradient></defs><Species/></svg>}
function GardenCanopy(){return <svg className="garden-canopy" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="pink"><stop stopColor="#ffdbe3"/><stop offset="1" stopColor="#df809e"/></radialGradient></defs><path d="M-20 40C120 10 110 130 260 112M1020 28C880 20 900 120 760 128" fill="none" stroke="#5b352f" strokeWidth="9"/>{[[55,35],[104,57],[152,92],[925,45],[875,69],[824,102]].map(([x,y],i)=><g key={i} transform={'translate('+(x-60)+' '+(y-60)+') scale(.22)'}><Sakura/></g>)}</svg>}
export function BotanicalGarden({flowers}){
 const[open,setOpen]=useState([]);
 return <div className="botanical-garden"><GardenCanopy/><div className="botanical-grid">{flowers.map(([name,meaning],i)=><button key={name} className={'botanical-item '+(open.includes(i)?'open':'')} onClick={()=>setOpen(v=>v.includes(i)?v:[...v,i])}><Botanical index={i} bloomed={open.includes(i)}/><strong>{name}</strong><small>{open.includes(i)?meaning:'Touch to bloom'}</small></button>)}</div></div>
}
