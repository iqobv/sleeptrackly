'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from './Dropdown.types';

const Dropdown = ({
	children,
	buttonRef,
	isOpen,
	onClose,
	width = 400,
	className = '',
}: DropdownProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ top: 0, left: 0 });

	const handleClose = useCallback(() => {
		onClose();
		buttonRef?.current?.focus();
	}, [onClose, buttonRef]);

	useEffect(() => {
		if (buttonRef?.current && isOpen) {
			const updatePosition = () => {
				if (!buttonRef.current) return;
				const rect = buttonRef.current.getBoundingClientRect();
				const screenWidth = window.innerWidth;

				let newLeft = rect.left;
				if (rect.left + width > screenWidth) {
					newLeft = Math.max(10, rect.right - width);
				}

				setPosition({
					top: rect.bottom + 8,
					left: newLeft,
				});
			};

			updatePosition();
			window.addEventListener('resize', updatePosition);
			return () => window.removeEventListener('resize', updatePosition);
		}
	}, [buttonRef, width, isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (
				buttonRef?.current &&
				!buttonRef.current.contains(e.target as Node) &&
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleClickOutside);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'auto';
		};
	}, [isOpen, handleClose, buttonRef]);

	return (
		<div
			ref={containerRef}
			className={`${styles['dropdown']} ${
				isOpen ? styles['dropdown--open'] : ''
			} ${className}`}
			style={
				{
					'--top': `${position.top}px`,
					'--left': `${position.left}px`,
					'--width': `${width}px`,
				} as React.CSSProperties
			}
			role="dialog"
		>
			{children}
		</div>
	);
};

export default Dropdown;
