'use client';

import { useBlockScroll } from '@/hooks';
import { useCallback, useEffect, useRef } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const useModal = ({ isOpen, onClose }: ModalProps) => {
	const modalRef = useRef<HTMLInputElement>(null);

	useBlockScroll(isOpen);

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [handleClickOutside]);

	useEffect(() => {
		const app = document.getElementById('app');

		if (isOpen) app?.setAttribute('inert', 'true');

		return () => app?.removeAttribute('inert');
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	return {
		modalRef,
	};
};
