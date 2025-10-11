'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useNav = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isOpenForBtn, setIsOpenForBtn] = useState(false);

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const show = mounted && isMobile;

	const handleClick = () => {
		if (isOpen) setIsClosing(true);
		else setIsOpen(true);
		setIsOpenForBtn(!isOpenForBtn);
	};

	useEffect(() => {
		if (isClosing) {
			const timeout = setTimeout(() => {
				setIsOpen(false);
				setIsClosing(false);
			}, 300);
			return () => clearTimeout(timeout);
		}
	}, [isClosing]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset';
	}, [isOpen]);

	const handleCloseOnOverlay = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) handleClick();
	};

	return {
		isOpenForBtn,
		isClosing,
		show,
		isOpen,
		handleCloseOnOverlay,
		handleClick,
	};
};
