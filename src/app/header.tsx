"use client";
import { useEffect, useRef } from "react";
import { Germania_One } from "next/font/google";
const germ = Germania_One({
	weight: "400",
	subsets: ["latin"],
});
let prev = 0;
let cur = 0;
function Header() {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			if (!ref.current) return;
			const element = ref.current;
			const lastChild = element.lastElementChild as HTMLDivElement;
			cur = window.scrollY;
			let main = document.querySelector("main");
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
		<div ref={ref} className="fixed lg:left-1/2 duration-500 z-20 lg:w-[40vw] lg:-translate-x-1/2  w-full top-0  bg- ado/25 backdrop-blur-sm gap-2 text-oxford-blue-900 border-dark-purple-500 bo rder h-[8vh] items-center flex flex-col">
			<div className="w-full h-full px-[2vw] flex items-center ">
				<label className="eng text-2xl flex hidden">
					j<span className=" p">p</span>
					<span className=" b">b</span>
				</label>
				<label className={"eng text-ado-blue-800 flex text-[3vh] " + germ.className}>
					<span className="">j</span>
					<span className="-ml-[0.7vh] mt-[0.6vh]">b</span>
				</label>
			</div>
			<div className="w-full duration-300 bg-ado-blue-600 h-[0.1vmin]"></div>
		</div>
	);
}

export default Header;
