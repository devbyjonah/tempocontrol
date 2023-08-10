"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Button({
	label,
	link,
	hover,
	className,
	onClick,
}: {
	label: string;
	link?: string;
	hover?: boolean;
	className?: string;
	onClick?: () => void;
}) {
	if (link) {
		return (
			<Link
				className={
					className +
					" py-3 px-5 rounded text-lg font-bold " +
					(hover
						? " hover:-translate-y-1 hover:shadow-secondary"
						: "")
				}
				href={link}
			>
				{label}
			</Link>
		);
	} else {
		if (
			label === "Login" ||
			label === "Logout" ||
			label === "Sign up and improve for free!"
		) {
			onClick = label == "Logout" ? signOut : signIn;
		}
		return (
			<button
				className={
					className +
					" py-3 px-5 rounded text-lg font-bold " +
					(hover
						? "hover:-translate-y-1 hover:shadow-secondary "
						: "")
				}
				onClick={onClick}
			>
				{label}
			</button>
		);
	}
}
