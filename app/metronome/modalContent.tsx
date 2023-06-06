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
		<div className="bg-white rounded-full w-full h-full p-5 flex flex-col gap-10">
			<div className="text-center pt-4">
				<h1 className="text-2xl font-bold">Subdivision</h1>
				<p className="text-accent">How many subdivisions per beat?</p>
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
