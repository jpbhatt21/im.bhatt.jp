"use client";
import { frame, motion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
const spring = { damping: 100, stiffness: 500, restDelta: 0.001 };

export function useFollowPointer(ref: any, focus: any) {
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);
	const w = useSpring(320, spring);
	const h = useSpring(320, spring);
	const r = useSpring(500, spring);
	useEffect(() => {
		if (!ref.current) return;

		const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
			if (!ref.current) return;
			const element = ref.current!;

			frame.read(() => {
				if (focus.current) {
					let focusElement = focus.current;
					let rect = focusElement.getBoundingClientRect();
					w.set(focusElement.offsetWidth);
					h.set(focusElement.offsetHeight);
					x.set(rect.left - element.offsetLeft);
					y.set(rect.top - element.offsetTop);
					r.set(6);
				} else {
					x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
					y.set(clientY - element.offsetTop - element.offsetHeight / 2);
					w.set(320);
					h.set(320);
					r.set(500);
				}
			});
		};

		window.addEventListener("pointermove", handlePointerMove);

		return () => window.removeEventListener("pointermove", handlePointerMove);
	}, []);

	return { x, y, w, h, r };
}
let arr: any = [];
export default function Home() {
	const pad = 0;
	const [index, setIndex] = useState(0);
	const [index2, setIndex2] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const focus = useRef<HTMLDivElement>(null);
	const scroller = useRef<HTMLDivElement>(null);
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);
	const w = useSpring(256, spring);
	const h = useSpring(256, spring);
	const r = useSpring(500, spring);
	let [clientX, clientY] = [0, 0];
	const coverHeight = useSpring(0, spring);
	const text = ["bhatt.jp", "ભટ્ટ.જપ", "भट्ट.जप"];
	const handlePointerMove = (e: any) => {
		clientX = e.clientX;
		clientY = e.clientY;
	};

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
				className="border border-space-cadet-600 rounded-md"
				style={{
					width: Math.random() * 200 + 50 + "px",
					height: Math.random() * 200 + 50 + "px",
				}}></div>
		));
		let counter = 0;
		const interval = setInterval(() => {
			if (counter++ % 30 == 0) {setIndex( Math.floor(Math.random() * text.length));

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
					// w.set(256);
					// h.set(256);
					if (w.get() > h.get()) w.set(h.get());
					else h.set(w.get());
					r.set(500);
				}
			});
		}, 100);

		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("scroll", (e) => {
			if (!scroller.current) return;
			coverHeight.set((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * window.innerHeight);
		});
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			clearInterval(interval);
		};
	}, [text.length]);
	return (
		<div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<motion.div className="w-82 h-82 rounded-md z- 10 bg-dark-purple-700 fixed" ref={ref} style={{ x, y, width: w, height: h, borderRadius: r }}></motion.div>

			<div className="fixed z-0 w-full h-full top-0 left-0 bg-rich-black-500/50 backdrop-blur-2xl"></div>
			<main className="flex w-4xl z-10 flex-col gap-[32px] text-3xl row-start-2 items-center">
				<div className="h-10 mt-20 mb-10 flex w-full items-center eng justify-center">
					Hi, I'm{" "}
					<div className=" h-10 flex  text-oxford-blue-900 flex-col gap-8 items-center justify-center p-2 ">
						<label className="guj h-10 flex duration-300 items-center justify-center" style={{ marginTop: [8.75, 0, -8.25][index] + "rem", opacity: [1, 0, 0][index], scale: [1, 0.5, 0.5][index] }}>
							જતન
						</label>
						<label className="eng h-10 flex items-center justify-center duration-300" style={{ opacity: [0, 1, 0][index], scale: [0.5, 1, 0.5][index] }}>
							jatan
						</label>
						<label className="hindi h-10 flex items-center justify-center duration-300" style={{ opacity: [0, 0, 1][index], scale: [0.5, 0.5, 1][index] }}>
							जतन
						</label>
					</div>
					<div className=" h-10 flex  text-oxford-blue-900 flex-col gap-8 justify-center py-2 ">
						<label className="guj h-10 flex duration-300 items-center " style={{ marginTop: [8.75, 0, -8.25][index2] + "rem", opacity: [1, 0, 0][index2], scale: [1, 0.5, 0.5][index2] }}>
							ભટ્ટ
						</label>
						<label className="eng h-10 flex items-center duration-300" style={{ opacity: [0, 1, 0][index2], scale: [0.5, 1, 0.5][index2] }}>
							bhatt
						</label>
						<label className="hindi h-10 flex items-center duration-300" style={{ opacity: [0, 0, 1][index2], scale: [0.5, 0.5, 1][index2] }}>
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
				<div ref={scroller} className="w-full flex hid den flex-wrap justify-center items-center gap-8 ">
					{arr}
				</div>
			</main>

			<motion.div className="fixed  right-0 top-0 w-9 rounded-b-full  overflow-hidden" style={{ height: coverHeight }}>
				{new Array(Math.round(window.innerHeight / 60)).fill(0).map((_, i) => (
					<div className="w-8 h-31 tint"></div>
				))}
			</motion.div>

			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">Hello</footer>
		</div>
	);
}
