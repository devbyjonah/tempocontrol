export default function TempoSlider({ tempo }: { tempo: number }) {
	return (
		<div className="h-5/6 w-12 absolute top-0">
			<div className="bg-accent ">{tempo} bpm</div>
		</div>
	);
}
