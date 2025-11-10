export interface ConfirmModalProps {
	title?: string;
	text: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	onCancel: () => void;
}
