export default function Card({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: JSX.Element;
}) {
	return (
		<div className="shadow-primary flex flex-col text-center max-w-md bg-accent rounded p-5 m-5">
			<div className="text-7xl mx-auto pb-4 text-black">{icon}</div>
			<h3 className="font-bold text-xl mb-3">{title}</h3>
			<p>{description}</p>
		</div>
	);
}
