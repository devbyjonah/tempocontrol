import Link from "next/link";

export default function PrimaryButton({
	label,
	link,
}: {
	label: string;
	link: string;
}) {
	return (
		<Link
			className="bg-secondary text-black py-3 px-5 rounded text-xl"
			href={link}
		>
			{label}
		</Link>
	);
}
