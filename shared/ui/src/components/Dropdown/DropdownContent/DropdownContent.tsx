'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropdownContext } from '../DropdownContext';
import styles from './DropdownContent.module.scss';

interface DropdownContentProps extends DropdownMenu.DropdownMenuContentProps {
	children: React.ReactNode;
}

export const DropdownContent = ({
	children,
	side = 'bottom',
	align = 'start',
	sideOffset = 4,
	className = '',
	...props
}: DropdownContentProps) => {
	const { isOpen } = useDropdownContext();

	return (
		<DropdownMenu.Portal forceMount>
			<AnimatePresence>
				{isOpen && (
					<DropdownMenu.Content
						asChild
						forceMount
						side={side}
						align={align}
						sideOffset={sideOffset}
						className={`${styles.content} ${className}`}
						{...props}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: -5 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -5 }}
							transition={{ duration: 0.15, ease: 'easeOut' }}
						>
							{children}
						</motion.div>
					</DropdownMenu.Content>
				)}
			</AnimatePresence>
		</DropdownMenu.Portal>
	);
};
