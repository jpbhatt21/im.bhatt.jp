"use client";
import { frame, motion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
const spring = { damping: 10, stiffness: 80, restDelta: 0.001 };

export function useFollowPointer(ref: any) {
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);

	useEffect(() => {
		if (!ref.current) return;

		const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
			const element = ref.current!;

			frame.read(() => {
				x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
				y.set(clientY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener("pointermove", handlePointerMove);

		return () => window.removeEventListener("pointermove", handlePointerMove);
	}, []);

	return { x, y };
}

export default function Home() {
	const [index, setIndex] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const { x, y } = useFollowPointer(ref);
	const text = ["bhatt.jp", "ભટ્ટ.જપ", "भट्ट.जप"];
	const classList = ["eng", "guj", "hindi"];
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % text.length);
		}, 3000);
		return () => clearInterval(interval); // Cleanup on unmount
	}, [text.length]);
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex w-4xl flex-col gap-[32px] text-3xl row-start-2 justify-center items-center bg-black sm:items-start">
				
				<motion.div className="w-82 h-82 rounded-full  bg-oxford-blue-700 top-1/2 left-1/2 fixed" ref={ref} style={{ x, y }}></motion.div>

				<div className="fixed w-full h-full top-0 left-0 bg-rich-black-500/50 backdrop-blur-3xl"></div>

				<div className=" h-10 hidden fixed top-1/2 left-1/2 text-oxford-blue-900 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 items-center justify-center p-2 ">
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
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">Hello</footer>
		</div>
	);
}
