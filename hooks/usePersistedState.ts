import { useState } from "react";

export default function usePersistedState<T>(
	key: string,
	initialValue: T,
): [T, (value: T) => void] {
	const isClient = typeof window !== "undefined";
	const storedValue = isClient
		? JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
		: initialValue;
	const [value, setValue] = useState<T>(storedValue);

	const updateValue = (newValue: T) => {
		setValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, updateValue];
}
