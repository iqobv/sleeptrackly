'use client';

import { BREAKPOINTS } from '@/constants/breakpoints.constants';
import { Breakpoint } from '@/types/ui/breakpoint.types';
import { useMounted } from '@shared/hooks';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useNavContainer = (breakpoint: Breakpoint) => {
	const mounted = useMounted();

	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isOpenForBtn, setIsOpenForBtn] = useState(false);

	const isMobile = useMediaQuery({
		query: `(max-width: ${BREAKPOINTS[breakpoint]})`,
	});
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
