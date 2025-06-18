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
		bgcolor: "#4f3caa",
		color: "#d9d9d9",
		style: {
			high: 0x6a4bf1,
			mid: 0xd9d9d9,
			base: 0x231b1f,
		},
	},
	{
		name: "Webtris",
		cover: "https://github.com/jpbhatt21/webtris/blob/main/public/logo.png?raw=true",
		record: "https://github.com/jpbhatt21/webtris/blob/d2ab3b8277848a0658cb1c5dbda3e6fe5bccf361/public/image.png?raw=true",
		date: "Dec. 2024",
		bgcolor: "#1a1b26",
		color: "#7f98b5",
		style: {
			high: 0x7eb3bc,
			mid: 0x7f98b5,
			base: 0x1b1b1b,
		},
	},

	{
		name: "Planetarium & P",
		cover: "https://github.com/jpbhatt21/planetarium3d/blob/main/public/logo.png?raw=true",
		record: "https://raw.githubusercontent.com/jpbhatt21/planetarium3d/1b418ddbb1ff4d00e0995c097f993f858292a7c8/public/p1.svg",
		date: "Feb. 2025",
		bgcolor: "#0c0c0e",
		color: "#cececf",
		style: {
			high: 0xeeddb6,
			mid: 0xcececf,
			base: 0x0c0c0e,
		},
	},
	{
		name: "WuWa Mod Manager",
		cover: "https://github.com/jpbhatt21/wuwa-mod-manager/raw/main/preview/logo.png",
		record: "https://github.com/jpbhatt21/wuwa-mod-manager/blob/main/assets/logo-Bp59aN_C.png?raw=true",
		date: "May 2025",
		bgcolor: "#151515",
		color: "#a5937c",
		style: {
			high: 0xcdb896,
			mid: 0xa5937c,
			base: 0x151515,
		},
	},
];
let vmin = 0;
let curIndex = -1;
export default function Home() {
	const pad = 50;
	const [index, setIndex] = useState(0);
	const [index2, setIndex2] = useState(0);
	const [vinyls, setVinyls] = useState<any>([]);
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
	const [cur, setCur] = useState(-2);
	useEffect(() => {
		curIndex = cur;
	}, [cur]);

	useEffect(() => {
		setVinyls(items.map((x: any, i: number) => (
			<div
				onMouseEnter={(e) => {
					focus.current = e.currentTarget;
				}}
				onMouseLeave={() => {
					focus.current = null;
				}}
				className="vinyl-container group duration-300 delay -100 w-[33vmin] max-w-[33vmin] min-w-[33vmin] h-[33vmin] max-h-[33vmin] min-h-[33vmin] items-center justify-center p-0"
				style={{ marginInline: i == cur ? "8vmin" : "", marginTop: i == cur ? "-16.5vmin" : "0" }}
				onClick={() => {
					if (!projectRef.current) return;
					window.scrollTo({ top: projectRef.current.offsetTop + i * Math.min(window.innerHeight, window.innerWidth) });
				}}>
				<div className={"vinyl-cover rounded-sm p-[4vmin] pb-[6vmin] min-h-full min-w-full h-full w-full  flex  aspect-square shadow-xl back z-10 delay-200 duration-300  flex-col items-center " + (i == cur ? "-mr-[50%] group-hover:-mr-[0%] pointer-events-none group-hover:opacity-0" : " -mr-[100%] group-hover:-mr-[50%] ")} style={{ backgroundColor: x.bgcolor || "#081326", color: x.color || "var(--color-oxford-blue-900)", transitionProperty: "margin-right , opacity" }}>
					<div className="min-w-full min-h-full aspect-square  flex items-center justify-center">
						<img className="w-full  opacity-90" src={x.cover}></img>
					</div>
					<label className="eng min-h-[8vmin]  text-[2.5vmin]">{x.date}</label>
				</div>
				<div className={"vinyl-record shadow-xl min-h-full min-w-full h-full w-full  duration-200 delay-200 flex items-center justify-center pointer-events-none " + (i == cur ? "spinning group-hover:scale-125  group-hover:-ml-[105%] " : "")}>
					<img className="w-[10vmin] bg-oxford-blue-300 aspect-square rounded-full" src={x.record}></img>
				</div>
			</div>
		)));
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
		vmin = Math.min(window.innerHeight, window.innerWidth) * 0.01;
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("scroll", (e) => {
			if (!scroller.current) return;
			coverHeight.set((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
			if (projectRef.current) {
				let top = projectRef.current.getBoundingClientRect().top;
				let bottom = projectRef.current.getBoundingClientRect().bottom;
				let index = -1;
				if (top > 0) {
					index = -1;
				} else {
					index = Math.floor(-top / (vmin * 100));
					index = index > items.length ? items.length : index;
				}
				if (top > window.innerHeight - vmin * 40) index = -2;
				if (bottom < vmin * 40) index = items.length + 1;
				console.log(curIndex, index);
				if (index != curIndex) {
					setVinyls(items.map((x: any, i: number) => (
						<div
							onMouseEnter={(e) => {
								focus.current = e.currentTarget;
							}}
							onMouseLeave={() => {
								focus.current = null;
							}}
							className="vinyl-container group duration-300 delay -100 w-[33vmin] max-w-[33vmin] min-w-[33vmin] h-[33vmin] max-h-[33vmin] min-h-[33vmin] items-center justify-center p-0"
							style={{ marginInline: i == index ? "8vmin" : "", marginTop: i == index ? "-16.5vmin" : "0" }}
							onClick={() => {
								if (!projectRef.current) return;
								window.scrollTo({ top: projectRef.current.offsetTop + i * Math.min(window.innerHeight, window.innerWidth) });
							}}>
							<div className={"vinyl-cover rounded-sm p-[4vmin] pb-[6vmin] min-h-full min-w-full h-full w-full  flex  aspect-square shadow-xl back z-10 delay-200 duration-300  flex-col items-center " + (i == index ? "-mr-[50%] group-hover:-mr-[0%] pointer-events-none group-hover:opacity-0" : " -mr-[100%] group-hover:-mr-[50%] ")} style={{ backgroundColor: x.bgcolor || "#081326", color: x.color || "var(--color-oxford-blue-900)", transitionProperty: "margin-right , opacity" }}>
								<div className="min-w-full min-h-full aspect-square  flex items-center justify-center">
									<img className="w-full  opacity-90" src={x.cover}></img>
								</div>
								<label className="eng min-h-[8vmin]  text-[2.5vmin]">{x.date}</label>
							</div>
							<div className={"vinyl-record shadow-xl min-h-full min-w-full h-full w-full  duration-200 delay-200 flex items-center justify-center pointer-events-none " + (i == index ? "spinning group-hover:scale-125  group-hover:-ml-[105%] " : "")}>
								<img className="w-[10vmin] bg-oxford-blue-300 aspect-square rounded-full" src={x.record}></img>
							</div>
						</div>
					)));
					setCur(index);
				}
			}
		});
		window.addEventListener("resize", () => {
			vmin = Math.min(window.innerHeight, window.innerWidth) * 0.01;
		});
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			clearInterval(interval);
		};
	}, [text.length]);
	return (
		<>
			<VantaFogBackground {...(items[cur]?.style || {})}>a</VantaFogBackground>
			<div className="flex flex-col overflow-x-clip items-center min-h-screen w-full p-8 pb-20  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<motion.div className="w-82 h-82 rounded-md z- 10 bg-ado-blue-800 fixed" ref={ref} style={{ x, y, width: w, height: h, borderRadius: r, backgroundColor: items[cur] ? items[cur].color||("#" + items[cur].style.base.toString(16)) : "" }}></motion.div>

				<div className="fixed z-0 w-full h-screen top-0 left-0 bg-rich-black-500/50 backdrop-blur-2xl"></div>

				<main className="flex w-full duration-300 lg:w-[50vw] lg:-mt-20 z-10 flex-col gap-[10vh] row-start-2 items-center">
					<div className="w-full min-h-screen flex flex-col gap-[10vh] items-center">
						<div className={"h-[6vh] text-[6vh] mt-[16vh] lg:mt-[20vh] text-ado-blue-800 flex w-full items-center  justify-center " + germ.className}>
							Hi, I'm{" "}
							<div className=" h-[6vh] flex  text-ado-blue-600 flex-col gap-[2vh] items-center justify-center p-2 ">
								<label className={"h-[6vh] flex duration-300 items-center justify-center " + guj.className} style={{ marginTop: [16.5, 0, -15.5][index] + "vh", opacity: [1, 0, 0][index], scale: [1, 0.5, 0.5][index] }}>
									જતન
								</label>
								<label className=" h-[6vh] flex items-center justify-center duration-300" style={{ opacity: [0, 1, 0][index], scale: [0.5, 1, 0.5][index] }}>
									Jatan
								</label>
								<label className={"h-[6vh] flex items-center justify-center duration-300 " + hindi.className} style={{ opacity: [0, 0, 1][index], scale: [0.5, 0.5, 1][index] }}>
									जतन
								</label>
							</div>
							<div className=" h-[6vh] flex  text-ado-blue-600 flex-col gap-[2vh] justify-center py-2 ">
								<label className={"h-[6vh] flex duration-300 items-center  " + guj.className} style={{ marginTop: [16.5, 0, -15.5][index2] + "vh", opacity: [1, 0, 0][index2], scale: [1, 0.5, 0.5][index2] }}>
									ભટ્ટ
								</label>
								<label className="h-[6vh] flex items-center duration-300" style={{ opacity: [0, 1, 0][index2], scale: [0.5, 1, 0.5][index2] }}>
									Bhatt
								</label>
								<label className={"h-[6vh] flex items-center duration-300 " + hindi.className} style={{ opacity: [0, 0, 1][index2], scale: [0.5, 0.5, 1][index2] }}>
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
						<div className="eng text-ado-blue-800 text-[3vh] w-full">
							Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
							hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
						</div>
					</div>
					<div ref={scroller} className="w-full hidden flex hid den flex-wrap justify-center items-center gap-8 ">
						{arr}
					</div>
					<div
						ref={projectRef}
						className="h-[500vh] w-full  px-0 transition-opacity duration-300 items-center flex flex-col"
						style={{
							opacity: cur == -2 || cur == items.length + 1 ? 0 : 1,
						}}>
						<div className="eng text-ado-blue-800 sticky text-[5vh] top-[calc(50%-37.5vmin)]">PROJECTS</div>
						<div
							className="h-[41vmin] w-full  sticky duration-300 self-start top-[calc(50%-20.5vmin)] translate-x-1/2  gap-[11vmin] overflow-x-visible flex items-center justify-start"
							style={{
								marginLeft: "calc(-24.375vmin - " + (cur < 0 ? -9 : cur >= items.length ? items.length * 44 - 53 : cur * 44) + "vmin)",
							}}>
							{vinyls}
						</div>
					</div>
					<div className="h-[500vh] w-full items-center flex flex-col"></div>
					<div className="fixed w-[1px] h-[1px] bg-red-500 hidden top-1/2 left-1/2"></div>
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
