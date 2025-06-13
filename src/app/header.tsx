"use client";
import { useEffect, useRef } from "react";
import { Germania_One } from "next/font/google";
const germ = Germania_One({
	weight: "400",subsets: ["latin"],
});
let prev = 0;
let cur = 0;
function Header() {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			console.log(e);
			if (!ref.current) return;
			const element = ref.current;
			cur = window.scrollY;
			if (cur > prev) {
				element.style.top = "-12px";
				element.style.opacity = "0";
				element.style.filter = "blur(4px)";
			} else {
				element.style.top = "8px";
				element.style.opacity = "1";
				element.style.filter = "blur(0px)";
			}
			prev = cur;
		});
	}, []);
	return (
		<div ref={ref} className="fixed lg:left-1/2 duration-500 z-20 lg:w-xl lg:-translate-x-1/2  w-[calc(100%-16px)] mx-2 bg-dark-purple-500/25 backdrop-blur px-4 top-2 rounded-md text-oxford-blue-900 border-dark-purple-500 border h-16  flex flex-row items-center">
			<label className="eng text-2xl flex hidden">
				j<span className=" p">p</span>
				<span className=" b">b</span>
			</label>
			<label className={"eng text-ado-light text-2xl "+germ.className}>jpb</label>
		</div>
	);
}

export default Header;
