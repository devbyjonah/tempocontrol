import Image from "next/image";

import PrimaryButton from "./primaryButton";
import SecondaryButton from "./secondaryButton";
import DropDownToggle from "./dropdownToggle";

import { signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Header() {
	const session = await getServerSession(authOptions);
	return (
		<header className="z-10 fixed top-0 left-0 w-full h-20 bg-background">
			<nav className="h-full flex">
				<ul className="w-1/2 flex justify-start gap-2 items-center h-full p-3">
					<PrimaryButton
						label={session ? "Logout" : "Login"}
						link=""
					/>
					<Image
						className="rounded-full border-2 border-accent-dark justify-self-end hidden sm:inline"
						src="/logo.png"
						alt="profile pic"
						width={65}
						height={65}
					/>
				</ul>
				<ul className="flex w-1/2 justify-end gap-2 items-center h-full p-3">
					<SecondaryButton
						className="hidden sm:inline"
						label="Home"
						link="/"
					/>
					<SecondaryButton
						className="hidden sm:inline"
						label="Metronome"
						link="/metronome"
					/>
					<DropDownToggle />
				</ul>
			</nav>
		</header>
	);
}
