"use client";
import { frame, motion, useMotionTemplate, useSpring } from "motion/react";
import { Germania_One, Noto_Serif_Gujarati, Tiro_Devanagari_Hindi } from "next/font/google";
const germ = Germania_One({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-eng",
});
const guj = Noto_Serif_Gujarati({
	weight: "400",
	subsets: ["gujarati"],
	variable: "--font-guj",
});
const hindi = Tiro_Devanagari_Hindi({
	weight: "400",
	subsets: ["devanagari"],
	variable: "--font-hindi",
});
import { useEffect, useRef, useState } from "react";
import VantaFogBackground from "./comp/vanta";
const spring = { damping: 100, stiffness: 500, restDelta: 0.001 };
let arr: any = [];
let items: any = [
	{
		name: "Websu",
		cover: "https://github.com/jpbhatt21/websu/raw/main/public/websu.png",
		record: "https://github.com/jpbhatt21/websu/raw/main/public/websu.png",
		date: "Oct. 2024",
		bgcolor:"#4f3caa",
		color:"#d9d9d9",
		style:{
			high:0x6a4bf1,
			mid:0xd9d9d9,
			base:0x231b1f,
		}
	},{
		name: "Webtris",
		cover: "https://github.com/jpbhatt21/webtris/blob/main/public/logo.png?raw=true",
		record: "https://github.com/jpbhatt21/webtris/blob/d2ab3b8277848a0658cb1c5dbda3e6fe5bccf361/public/image.png?raw=true",
		date: "Dec. 2024",
		bgcolor:"#1a1b26",
		color:"#7f98b5",
		style:{
			high:0x7eb3bc,
			mid:0x7f98b5,
			base:0x1b1b1b,
		}
	},
	
	{
		name: "Planetarium & P",
		cover: "https://github.com/jpbhatt21/planetarium3d/blob/main/public/logo.png?raw=true",
		record: "https://raw.githubusercontent.com/jpbhatt21/planetarium3d/1b418ddbb1ff4d00e0995c097f993f858292a7c8/public/p1.svg",
		date: "Feb. 2025",
		bgcolor:"#0c0c0e",
		color:"#cececf",
		style:{
			high:0xeeddb6,
			mid:0xcececf,
			base:0x0c0c0e,
		}
		
	},
	{
		name: "WuWa Mod Manager",
		cover: "https://github.com/jpbhatt21/wuwa-mod-manager/raw/main/preview/logo.png",
		record: "https://github.com/jpbhatt21/wuwa-mod-manager/blob/main/assets/logo-Bp59aN_C.png?raw=true",
		date: "May 2025",
		bgcolor:"#151515",
		color:"#a5937c",
		style:{
			high:0xcdb896,
			mid:0xa5937c,
			base:0x151515,
		}
	},
];

export default function Home() {
	const pad = 20;
	const [index, setIndex] = useState(0);
	const [index2, setIndex2] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const focus = useRef<HTMLDivElement>(null);
	const scroller = useRef<HTMLDivElement>(null);
	const projectRef = useRef<HTMLDivElement>(null);
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);
	const w = useSpring(
		0, //256
		spring
	);
	const h = useSpring(
		0, //256
		spring
	);
	const r = useSpring(500, spring);
	let [clientX, clientY] = [0, 0];
	const coverHeight = useSpring(0, spring);
	const mask = useMotionTemplate`linear-gradient(to bottom,   #fff calc(${coverHeight}% - 40px), #0000 calc(${coverHeight}%) )`;
	const text = ["bhatt.jp", "ભટ્ટ.જપ", "भट्ट.जप"];
	const handlePointerMove = (e: any) => {
		clientX = e.clientX;
		clientY = e.clientY;
	};
	const [cur, setCur] = useState(0);

	let vinyls = items.map((x: any, i: number) => (
		<div
			className="vinyl-container group duration-300 delay -100 w-75 max-w-75 h-75 max-h-75"
			style={{ marginLeft: i == 0 ? "calc(50% - 50px - " +(cur<0?0: 500 * cur )+ "px - " + (cur <=0 ? 0 : 200) + "px)" : i == cur ? "200px" : "", marginTop: i == cur ? "-150px" : "0px",
			 }}
			onClick={() => {
				if(!projectRef.current) return;
				window.scrollTo({ top: projectRef.current.offsetTop + i * 300, behavior: "smooth"});
			}}>
			<div className={"vinyl-record shadow-xl min-w-75 min-h-75 duration-200 delay-200 flex items-center justify-center " + (i == cur ? "spinning group-hover:scale-150group-hover:mt-[20%] group-hover:-ml-[35%]" : "")}>
				<img className="w-24 bg-oxford-blue-300 aspect-square rounded-full" src={x.record}></img>
			</div>
			<div style={{backgroundColor: x.bgcolor || "#081326",color:x.color||"var(--color-oxford-blue-900)"}} className={"vinyl-cover rounded-sm p-12 flex max-w-78.75 max-h-78.75 shadow-xl back z-20 delay-200 duration-300  flex-col items-center justify-center  -mt-[2.5%] " + (i == cur ? "-ml-[152.5%] group-hover:-ml-[207.5%] group-hover:-ml -[177.5%] group-hover:opacity-0" : "-ml-[102.5%] group-hover:-ml-[152.5%] ")}>
				<div className="w-full h-full flex items-center justify-center">
					<img className="w-full  opacity-90" src={x.cover}></img>
				</div>
				<label className="eng">{x.date}</label>
			</div>
		</div>
	));

	useEffect(() => {
		arr = new Array(20).fill(0).map((_, i) => (
			<div
				key={i}
				onMouseEnter={(e) => {
					focus.current = e.currentTarget;
				}}
				onMouseLeave={() => {
					focus.current = null;
				}}
				className="border border-ado-blue-600 rounded-md"
				style={{
					width: Math.random() * 200 + 50 + "px",
					height: Math.random() * 200 + 50 + "px",
				}}></div>
		));
		let counter = 0;
		const interval = setInterval(() => {
			if (counter++ % 30 == 0) {
				setIndex(Math.floor(Math.random() * text.length));

				setIndex2(Math.floor(Math.random() * text.length));
			}
			// (prevIndex) => (prevIndex + 1) % text.length);

			if (!ref.current) return;
			const element = ref.current!;

			frame.read(() => {
				if (focus.current) {
					let focusElement = focus.current;
					let rect = focusElement.getBoundingClientRect();
					w.set(focusElement.offsetWidth + pad);
					h.set(focusElement.offsetHeight + pad);
					x.set(rect.left - element.offsetLeft - pad / 2);
					y.set(rect.top - element.offsetTop - pad / 2);
					r.set(6);
				} else {
					x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
					y.set(clientY - element.offsetTop - element.offsetHeight / 2);
					w.set(0);
					h.set(0);
					// if (w.get() > h.get()) w.set(h.get());
					// else h.set(w.get());
					r.set(500);
				}
			});
		}, 100);

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("scroll", (e) => {
			if (!scroller.current) return;
			coverHeight.set((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
			if(projectRef.current){
				let top = projectRef.current.getBoundingClientRect().top;
				console.log(top);
				if(top >0)
					setCur(-1);
				else 
				setCur(Math.min(items.length -1,Math.floor(-top/300)))
			}
		});
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			clearInterval(interval);
		};
	}, [text.length]);
	return (
		<>
			<VantaFogBackground {...(items[cur]?.style||{})}>a</VantaFogBackground>
			<div className="flex flex-col overflow-x-clip items-center min-h-screen w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<motion.div className="w-82 h-82 rounded-md z- 10 bg-ado-blue-800 fixed" ref={ref} style={{ x, y, width: w, height: h, borderRadius: r }}></motion.div>

				<div className="fixed z-0 w-full h-screen top-0 left-0 bg-rich-black-500/50 backdrop-blur-2xl"></div>
				<main className="flex sm:w-full  lg:w-4xl z-10 flex-col gap-[32px] text-3xl row-start-2 items-center">
					<div className={"h-10 mt-20 mb-10 text-ado-blue-800 flex w-full items-center  justify-center " + germ.className}>
						Hi, I'm{" "}
						<div className=" h-10 flex  text-ado-blue-600 flex-col gap-8 items-center justify-center p-2 ">
							<label className={"h-10 flex duration-300 items-center justify-center " + guj.className} style={{ marginTop: [8.75, 0, -8.25][index] + "rem", opacity: [1, 0, 0][index], scale: [1, 0.5, 0.5][index] }}>
								જતન
							</label>
							<label className=" h-10 flex items-center justify-center duration-300" style={{ opacity: [0, 1, 0][index], scale: [0.5, 1, 0.5][index] }}>
								Jatan
							</label>
							<label className={"h-10 flex items-center justify-center duration-300 " + hindi.className} style={{ opacity: [0, 0, 1][index], scale: [0.5, 0.5, 1][index] }}>
								जतन
							</label>
						</div>
						<div className=" h-10 flex  text-ado-blue-600 flex-col gap-8 justify-center py-2 ">
							<label className={"h-10 flex duration-300 items-center  " + guj.className} style={{ marginTop: [8.75, 0, -8.25][index2] + "rem", opacity: [1, 0, 0][index2], scale: [1, 0.5, 0.5][index2] }}>
								ભટ્ટ
							</label>
							<label className="h-10 flex items-center duration-300" style={{ opacity: [0, 1, 0][index2], scale: [0.5, 1, 0.5][index2] }}>
								Bhatt
							</label>
							<label className={"h-10 flex items-center duration-300 " + hindi.className} style={{ opacity: [0, 0, 1][index2], scale: [0.5, 0.5, 1][index2] }}>
								भट्ट
							</label>
						</div>
						<div className=" h-10 flex hidden  text-oxford-blue-900 flex-col gap-8 items-center justify-center p-2 ">
							<label className="guj h-10 flex duration-300 items-center justify-center" style={{ marginTop: [8.75, 0, -8.75][index] + "rem", opacity: [1, 0, 0][index], scale: [1, 0.5, 0.5][index] }}>
								ભટ્ટ.જપ
							</label>
							<label className="eng h-10 flex items-center justify-center duration-300" style={{ opacity: [0, 1, 0][index], scale: [0.5, 1, 0.5][index] }}>
								bhatt.jp
							</label>
							<label className="hindi h-10 flex items-center justify-center duration-300" style={{ opacity: [0, 0, 1][index], scale: [0.5, 0.5, 1][index] }}>
								भट्ट.जप
							</label>
						</div>
					</div>
					<div ref={scroller} className="w-full hidden flex hid den flex-wrap justify-center items-center gap-8 ">
						{arr}
					</div>
					<div ref={projectRef}className="h-640 w-full  px-0  items-center flex flex-col">
						<div className="h-120 w-screen sticky top-[24rem] gap-50 overflow-x-clip flex items-center justify-start">{vinyls}</div>
						
					</div><div className="h-0 w-full items-center flex flex-col"></div>
				</main>

				<div className="h-screen w-full pointer-events-none rotate-180 -mt-16 lg:mt-0 lg:rotate-0 rotate-y-180 lg:rotate-y-0 lg:top-0 left-0 fixed flex flex-col lg:flex-row lg:justify-end z-10">
					<motion.div className="cover -rotate-90 lg:rotate-0 origin-top-left overflow-hidden h-[100vw] lg:h-screen w-8" style={{ mask: mask }}>
						<div className="w-full h-full vines tint" />
					</motion.div>
				</div>

				<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">Hello</footer>
			</div>
		</>
	);
}
