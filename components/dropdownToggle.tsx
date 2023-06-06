"use client";
import { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import Button from "./button";

export default function DropdownToggle() {
	const [expanded, setExpanded] = useState(false);
	const dropdownButton = useRef<HTMLDivElement>(null);

	// this old solution is slower because it adds an event listener on every render
	// now we only add an event listener once the dropdown is opened
	// and remove the event listener once the dropdown is closed
	// useEffect(() => {
	// 	window.addEventListener("click", (event: Event) => {
	// 		if (
	// 			dropdownButton.current &&
	// 			dropdownButton.current.contains(event.target as Node)
	// 		) {
	// 			setExpanded(!expanded);
	// 		} else {
	// 			setExpanded(false);
	// 		}
	// 	});
	// });

	// is user clicks on the window while dropdown is open, close dropdown
	const handleWindowClick = (event: Event) => {
		if (
			dropdownButton.current &&
			!dropdownButton.current.contains(event.target as Node)
		) {
			setExpanded(false);
		}
	};

	const handleClick = () => {
		// if opening click add event listener to window to close if user clicks outside
		if (!expanded) {
			window.addEventListener("click", handleWindowClick);
		} else {
			window.removeEventListener("click", handleWindowClick);
		}
		setExpanded(!expanded);
	};

	return (
		<div onClick={handleClick} ref={dropdownButton}>
			<GiHamburgerMenu className="sm:hidden text-3xl text-white border-1 border-white hover:-translate-y-1 hover:shadow-secondary" />
			{expanded && (
				<div className="sm:hidden absolute top-20 right-0 w-1/2 h-40 bg-background opacity-90 rounded">
					<ul className="flex flex-col justify-center items-center h-full gap-2 p-3">
						<Button
							className="bg-white w-full opacity-100"
							label="Home"
							link="/"
						/>
						<Button
							className="bg-white w-full"
							label="Metronome"
							link="/metronome"
						/>
					</ul>
				</div>
			)}
		</div>
	);
}
