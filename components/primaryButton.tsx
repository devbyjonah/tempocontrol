"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function PrimaryButton({
	label,
	link,
	className,
	onClick,
}: {
	label: string;
	link?: string;
	className?: string;
	onClick?: () => void;
}) {
	if (link) {
		return (
			<Link
				className={
					"bg-primary py-3 px-5 rounded text-xl font-bold hover:-translate-y-1 hover:shadow-secondary " +
					className
				}
				href={link}
			>
				{label}
			</Link>
		);
	} else {
		if (label === "Login" || label === "Logout") {
			onClick = label == "Login" ? signIn : signOut;
		}
		return (
			<button
				className={
					"bg-primary py-3 px-5 rounded text-xl font-bold hover:-translate-y-1 hover:shadow-secondary " +
					className
				}
				onClick={onClick}
			>
				{label}
			</button>
		);
	}
}
