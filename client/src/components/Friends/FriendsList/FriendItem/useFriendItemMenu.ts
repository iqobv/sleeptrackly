import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export const useFriendItemMenu = () => {
	const menuRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [menuOpen, setMenuOpen] = useState(false);
	const [menuUp, setMenuUp] = useState(false);

	const updateMenuPosition = useCallback(() => {
		if (menuOpen && menuRef.current && containerRef.current) {
			const menuRect = menuRef.current.getBoundingClientRect();
			const containerRect = containerRef.current.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			if (containerRect.bottom + menuRect.height > viewportHeight) {
				setMenuUp(true);
			} else {
				setMenuUp(false);
			}
		}
	}, [menuOpen]);

	useLayoutEffect(() => {
		const handleCloseOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleCloseOutside);
		window.addEventListener('resize', updateMenuPosition);
		window.addEventListener('scroll', updateMenuPosition, true);

		return () => {
			document.removeEventListener('mousedown', handleCloseOutside);
			window.removeEventListener('resize', updateMenuPosition);
			window.removeEventListener('scroll', updateMenuPosition, true);
		};
	}, [menuOpen, updateMenuPosition]);

	useLayoutEffect(() => {
		updateMenuPosition();
	}, [menuOpen, updateMenuPosition]);

	const handleOpenMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setMenuOpen((prev) => !prev);
	};

	return {
		containerRef,
		handleOpenMenu,
		menuOpen,
		menuRef,
		menuUp,
	};
};
