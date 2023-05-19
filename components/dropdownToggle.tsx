"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import SecondaryButton from "./secondaryButton";

export default function DropdownToggle() {
	const [expanded, setExpanded] = useState(false);

	return (
		<>
			<GiHamburgerMenu
				onClick={() => setExpanded(!expanded)}
				className="sm:hidden text-3xl text-white border-1 border-white hover:-translate-y-1 hover:shadow-secondary"
			/>
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
		</>
	);
}
