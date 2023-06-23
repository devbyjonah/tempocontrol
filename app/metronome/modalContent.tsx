import Button from "../../components/button";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import { useState } from "react";

export const SubdivisionModal = ({
	changeSubdivision,
	initialValue,
}: {
	changeSubdivision: (value: number) => number;
	initialValue: number;
}) => {
	const [value, setValue] = useState(initialValue);
	const onClick = (value: number) => {
		const updatedSubdivision = changeSubdivision(value);
		setValue(updatedSubdivision);
	};

	return (
		<div className="bg-white rounded-full w-full h-full p-5 flex flex-col gap-6">
			<div className="text-center pt-4">
				<h1 className="text-2xl font-bold">Subdivision</h1>
				<p className="text-accent">How many subdivisions per beat?</p>
				<p className="text-accent">
					Combine with time signature for complex subdivisions.
				</p>
			</div>
			<div className="bg-primary w-1/3 mx-auto rounded-full flex justify-center items-center gap-5 text-2xl">
				<BsArrowLeftCircleFill
					onClick={() => {
						onClick(value - 1);
					}}
					className="hover:scale-150"
				/>
				<h1 className="text-5xl font-bold">{value}</h1>
				<BsArrowRightCircleFill
					onClick={() => {
						onClick(value + 1);
					}}
					className="hover:scale-150"
				/>
			</div>
			<div className="flex justify-around">
				<Button
					label="1"
					onClick={() => onClick(1)}
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(2)}
					label="2"
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(3)}
					label="3"
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(4)}
					label="4"
					className="bg-primary rounded-full"
				/>
			</div>
		</div>
	);
};

export const TimeSignatureModal = ({
	initialValue,
	changeTimeSignature,
}: {
	initialValue: number;
	changeTimeSignature: (value: number) => number;
}) => {
	const [beatsPerMeasure, setBeatsPerMeasure] = useState(initialValue);
	const onClick = (value: number) => {
		const updatedBeatsPerMeasure = changeTimeSignature(value);
		setBeatsPerMeasure(updatedBeatsPerMeasure);
	};

	return (
		<div className="bg-white rounded-full w-full h-full p-5 flex flex-col gap-6">
			<div className="text-center pt-4">
				<h1 className="text-2xl font-bold">Time Signature</h1>
				<p className="text-accent">How many beats per measure?</p>
				<p className="text-accent">
					Use the arrows to set a number not listed below.
				</p>
			</div>
			<div className="bg-primary w-1/3 mx-auto rounded-full flex justify-center items-center gap-5 text-2xl">
				<BsArrowLeftCircleFill
					onClick={() => {
						onClick(beatsPerMeasure - 1);
					}}
					className="hover:scale-150"
				/>
				<h1 className="text-5xl font-bold">{beatsPerMeasure}</h1>
				<BsArrowRightCircleFill
					onClick={() => {
						onClick(beatsPerMeasure + 1);
					}}
					className="hover:scale-150"
				/>
			</div>
			<div className="flex justify-around">
				<Button
					label="1"
					onClick={() => onClick(1)}
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(2)}
					label="2"
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(3)}
					label="3"
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(4)}
					label="4"
					className="bg-primary rounded-full"
				/>
			</div>
			<div className="flex justify-center gap-8">
				<Button
					onClick={() => onClick(5)}
					label="5"
					className="bg-primary rounded-full"
				/>
				<Button
					onClick={() => onClick(6)}
					label="6"
					className="bg-primary rounded-full"
				/>
			</div>
		</div>
	);
};
