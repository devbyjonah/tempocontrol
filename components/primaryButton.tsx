"use client";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

export default function PrimaryButton({
	label,
	link,
	className,
}: {
	label: string;
	link: string;
	className?: string;
}) {
	const { data: session } = useSession();
	let onClick = () => {};
	if (label === "Login") {
		if (session) {
			label = "Logout";
			onClick = () => signOut();
		} else {
			onClick = () => signIn();
		}
	}

	return (
		<Link
			className={
				"bg-primary py-3 px-5 rounded text-xl font-bold hover:-translate-y-1 hover:shadow-secondary " +
				className
			}
			href={link}
			onClick={onClick}
		>
			{label}
		</Link>
	);
}
