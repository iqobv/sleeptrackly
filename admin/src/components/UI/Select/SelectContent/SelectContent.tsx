'use client';

import * as Popover from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'framer-motion';
import { KeyboardEvent, useRef } from 'react';
import { useSelectContext } from '../SelectContext';
import styles from './SelectContent.module.scss';

interface SelectContentProps extends Popover.PopoverContentProps {
	children: React.ReactNode;
}

const SelectContent = ({
	children,
	side = 'bottom',
	align = 'start',
	sideOffset = 4,
	style,
	onCloseAutoFocus,
	...props
}: SelectContentProps) => {
	const { isOpen, triggerRef } = useSelectContext();
	const containerRef = useRef<HTMLDivElement>(null);

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();

			if (!containerRef.current) return;

			const items = Array.from(
				containerRef.current.querySelectorAll<HTMLDivElement>(
					'[role="option"]',
				),
			);

			if (items.length === 0) return;

			const currentIndex = items.indexOf(
				document.activeElement as HTMLDivElement,
			);
			let nextIndex = 0;

			if (e.key === 'ArrowDown') {
				nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
			} else {
				nextIndex =
					currentIndex === -1
						? items.length - 1
						: (currentIndex - 1 + items.length) % items.length;
			}

			items[nextIndex]?.focus();
		}
	};

	const handleOpenAutoFocus = (e: Event) => {
		if (!containerRef.current) return;

		const selectedItem = containerRef.current.querySelector<HTMLDivElement>(
			'[role="option"][aria-selected="true"]',
		);

		if (selectedItem) {
			e.preventDefault();
			selectedItem.focus();
		}
	};

	const handleCloseAutoFocus = (e: Event) => {
		if (triggerRef.current) {
			e.preventDefault();
			triggerRef.current.focus();
		}

		if (onCloseAutoFocus) {
			onCloseAutoFocus(e);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Popover.Portal forceMount>
					<Popover.Content
						asChild
						forceMount
						side={side}
						align={align}
						sideOffset={sideOffset}
						className={styles.content}
						style={{
							minWidth: 'var(--radix-popover-trigger-width)',
							...style,
						}}
						onOpenAutoFocus={handleOpenAutoFocus}
						onCloseAutoFocus={handleCloseAutoFocus}
						{...props}
					>
						<motion.div
							ref={containerRef}
							role="listbox"
							onKeyDown={handleKeyDown}
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -4 }}
							transition={{ duration: 0.15 }}
						>
							{children}
						</motion.div>
					</Popover.Content>
				</Popover.Portal>
			)}
		</AnimatePresence>
	);
};

export default SelectContent;
