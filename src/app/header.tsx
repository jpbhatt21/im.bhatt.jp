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
			const lastChild= element.lastElementChild as HTMLDivElement;
			cur = window.scrollY;
			if (cur > prev) {
				element.style.top = "-12px";
				element.style.opacity = "0";
				element.style.filter = "blur(4px)";
				lastChild.style.width = "0px";

			} else {
				element.style.top = "0px";
				element.style.opacity = "1";
				element.style.filter = "blur(0px)";
				lastChild.style.width = "100%";
			}
			prev = cur;
		});
	}, []);
	return (
		<div ref={ref} className="fixed lg:left-1/2 duration-500 z-20 lg:w-xl lg:-translate-x-1/2  w-[calc(100%-16px)] top-0  bg- ado/25 backdrop-blur gap-2 text-oxford-blue-900 border-dark-purple-500 bo rder h-16 items-center flex flex-col">
			<div className="w-full h-full px-4 flex items-center ">
				<label className="eng text-2xl flex hidden">
				j<span className=" p">p</span>
				<span className=" b">b</span>
			</label>
			<label className={"eng text-ado-blue-800 text-2xl "+germ.className}>jpb</label>
			</div>
			<div className="w-full duration-300 bg-ado-blue-600 h-[1px]"></div>
		</div>
	);
}

export default Header;
