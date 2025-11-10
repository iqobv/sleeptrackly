export interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	bodyClassName?: string;
	containerClassName?: string;
	onClose: () => void;
}
