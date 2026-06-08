export interface ConfirmModalProps {
	trigger?: React.ReactNode;
	title: string;
	text: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}
