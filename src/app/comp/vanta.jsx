import React, { useState, useEffect, useRef } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";
function lerpColor(a, b, t) {
	return a + Math.round((b - a) * t);
}

function hexToRgb(hex) {
	return [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff];
}

function rgbToHex([r, g, b]) {
	return (r << 16) | (g << 8) | b;
}
let timer = {};
const VantaFogBackground = ({ high = 0xb3d8ff, mid = 0x5c90d8, base = 0x162949, children }) => {
	const [vantaEffect, setVantaEffect] = useState(null);
	const vantaRef = useRef(null);

	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				FOG({
					el: vantaRef.current,
					THREE: THREE,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					highlightColor: high,
					midtoneColor: mid,
					baseColor: base,
					blurFactor: 0.5,
					speed: 1,
					zoom: 0.5,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);
	useEffect(() => {
		if (!vantaEffect) return;
		if (timer) clearTimeout(timer);
    let prev={high:vantaEffect.options.highlightColor,mid:vantaEffect.options.midtoneColor,base:vantaEffect.options.baseColor}
		const duration = 500; // ms
    const start = performance.now();
    const startColors ={high:vantaEffect.options.highlightColor,mid:vantaEffect.options.midtoneColor,base:vantaEffect.options.baseColor}
    const endColors = { high, mid, base };

    function animate(now) {
      const t = Math.min(1, (now - start) / duration);

      const lerped = {};
      ["high", "mid", "base"].forEach((key) => {
        const fromRgb = hexToRgb(startColors[key]);
        const toRgb = hexToRgb(endColors[key]);
        const currRgb = [
          lerpColor(fromRgb[0], toRgb[0], t),
          lerpColor(fromRgb[1], toRgb[1], t),
          lerpColor(fromRgb[2], toRgb[2], t),
        ];
        lerped[key] = rgbToHex(currRgb);
      });

      vantaEffect.setOptions({
        highlightColor: lerped.high,
        midtoneColor: lerped.mid,
        baseColor: lerped.base,
      });

      if (t < 1) {
        requestAnimationFrame(animate);
      } 
    }

    requestAnimationFrame(animate);
		
	}, [high, mid, base]);

	return (
		<div id={high + " " + mid + " " + base} ref={vantaRef} className="w-full h-screen fixed top-0 left-0 z-0">
			{children}
		</div>
	);
};

export default VantaFogBackground;
