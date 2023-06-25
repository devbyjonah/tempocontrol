import Button from "../../components/button";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import { useState } from "react";

const ModalContent = ({
	title,
	description,
	hint,
	changeValue,
	initialValue,
	numberOptions,
}: {
	title: string;
	description: string;
	hint: string;
	changeValue: (value: number) => number;
	initialValue: number;
	numberOptions: number[];
}) => {
	const [value, setValue] = useState(initialValue);
	const updateValue = (value: number) => {
		const newValue = changeValue(value);
		setValue(newValue);
	};

	return (
		<div className="bg-white rounded-full w-full h-full p-5 flex flex-col gap-6">
			<div className="text-center pt-4">
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="text-accent">{description}</p>
				<p className="text-accent">{hint}</p>
			</div>
			<div className="bg-primary w-1/3 mx-auto rounded-full flex justify-center items-center gap-5 text-2xl">
				<BsArrowLeftCircleFill
					onClick={() => {
						updateValue(value - 1);
					}}
					className="hover:scale-150"
				/>
				<h1 className="text-5xl font-bold">{value}</h1>
				<BsArrowRightCircleFill
					onClick={() => {
						updateValue(value + 1);
					}}
					className="hover:scale-150"
				/>
			</div>
			<div className="flex justify-around">
				{numberOptions.map((option) => (
					<Button
						key={option}
						label={String(option)}
						onClick={() => updateValue(option)}
						className={
							option === value ? "bg-accent" : "bg-primary"
						}
					/>
				))}
			</div>
		</div>
	);
};

export default ModalContent;
