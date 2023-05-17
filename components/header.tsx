import Image from "next/image";

import PrimaryButton from "./primaryButton";
import SecondaryButton from "./secondaryButton";

export default function Header() {
	return (
		<header className="w-full h-20">
			<nav className="h-full">
				<ul className="flex justify-between gap-2 items-center h-full p-3">
					<PrimaryButton label="Login" link="/login" />
					<h1 className="text-white text-3xl">Welcome, Jonah</h1>
					<Image
						className="rounded-full border-2 border-accent"
						src="/profile.png"
						alt="profile pic"
						width={100}
						height={100}
					/>
				</ul>
			</nav>
			<div className="bg-white w-full h-20 opacity-5 absolute inset-0"></div>
		</header>
	);
}
