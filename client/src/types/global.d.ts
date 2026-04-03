export {};

declare global {
	interface Window {
		Termly?: {
			initialize: () => void;
		};
	}
}
