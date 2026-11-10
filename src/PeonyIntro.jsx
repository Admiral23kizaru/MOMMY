import React,{useRef}from'react';
import{useFrame}from'@react-three/fiber';
import{EffectComposer,Bloom}from'@react-three/postprocessing';

function AtmosphereLight(){
 const ref=useRef();
 useFrame(({clock})=>{if(ref.current){ref.current.rotation.z=clock.elapsedTime*.03;ref.current.children.forEach((light,index)=>{light.intensity=1.8+Math.sin(clock.elapsedTime*.7+index)*.45})}});
 return <group ref={ref}><pointLight position={[-3,2,3]} color="#f5adc7" intensity={2.2} distance={8}/><pointLight position={[3,-1,2]} color="#d9a6e3" intensity={1.8} distance={7}/><pointLight position={[0,1,4]} color="#f3c878" intensity={1.7} distance={8}/></group>;
}
export function PeonyIntro({postprocessing=true}){
 return <><ambientLight intensity={.35}/><AtmosphereLight/>{postprocessing&&<EffectComposer multisampling={4}><Bloom intensity={.26} luminanceThreshold={1.1} luminanceSmoothing={.7} mipmapBlur radius={.45}/></EffectComposer>}</>;
}
