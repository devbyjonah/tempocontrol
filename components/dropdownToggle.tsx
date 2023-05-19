"use client";
import { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import SecondaryButton from "./secondaryButton";

export default function DropdownToggle() {
	const [expanded, setExpanded] = useState(false);
	const dropdownButton = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener("click", (event: Event) => {
			if (
				dropdownButton.current &&
				dropdownButton.current.contains(event.target as Node)
			) {
				setExpanded(!expanded);
			} else {
				setExpanded(false);
			}
		});
	});

	return (
		<div ref={dropdownButton}>
			<GiHamburgerMenu className="sm:hidden text-3xl text-white border-1 border-white hover:-translate-y-1 hover:shadow-secondary" />
			{expanded && (
				<div className="sm:hidden absolute top-20 right-0 w-1/2 h-40 bg-background opacity-90 rounded">
					<ul className="flex flex-col justify-center items-center h-full gap-2 p-3">
						<SecondaryButton
							className="w-full opacity-100"
							label="Home"
							link="/"
						/>
						<SecondaryButton
							className="w-full"
							label="Metronome"
							link="/metronome"
						/>
					</ul>
				</div>
			)}
		</div>
	);
}
