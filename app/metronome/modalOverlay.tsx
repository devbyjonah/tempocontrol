import { AiFillCloseCircle } from "react-icons/ai";

export default function ModalOverlay({
	isOpen,
	onClose,
	content,
}: {
	isOpen: boolean;
	onClose: () => void;
	content: JSX.Element;
}) {
	if (!isOpen) return null;

	const onLoseFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		<div
			onClick={onLoseFocus}
			className="flex justify-center items-center fixed z-10 top-0 left-0 w-full h-full bg-background-transparent"
		>
			<div className="relative max-w-md max-h-96 text-background bg-primary w-full h-full rounded">
				<AiFillCloseCircle
					onClick={onClose}
					className="absolute text-5xl hover:text-red-500"
				/>
				{content}
			</div>
		</div>
	);
}
