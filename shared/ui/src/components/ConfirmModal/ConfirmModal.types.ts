export interface ConfirmModalProps {
	trigger?: React.ReactNode;
	title: React.ReactNode | string;
	text: React.ReactNode | string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}
