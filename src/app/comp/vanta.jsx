import React, { useState, useEffect, useRef } from 'react'
import FOG from 'vanta/dist/vanta.fog.min'
import * as THREE from 'three'

const VantaFogBackground = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0xb3d8ff,
          midtoneColor: 0x5c90d8,
          baseColor: 0x162949,
          blurFactor: 0.5,
          speed:1,
          zoom:0.5,
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={vantaRef}  className='w-full h-full fixed top-0 left-0 z-0'>
      {children}
    </div>
  )
}

export default VantaFogBackground
