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
			className="bg-primary py-3 px-5 rounded text-xl font-bold hover:-translate-y-1 hover:shadow"
			href={link}
		>
			{label}
		</Link>
	);
}
