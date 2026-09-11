'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTooltipContext } from '../TooltipContext';
import styles from './TooltipContent.module.scss';
import { TooltipContentProps } from './TooltipContent.types';

export const TooltipContent = ({
	children,
	side = 'top',
	align = 'center',
	sideOffset = 4,
	className = '',
	showArrow = true,
	...props
}: TooltipContentProps) => {
	const { isOpen } = useTooltipContext();

	return (
		<AnimatePresence>
			{isOpen && (
				<TooltipPrimitive.Portal forceMount>
					<TooltipPrimitive.Content
						forceMount
						side={side}
						align={align}
						sideOffset={sideOffset}
						{...props}
					>
						<motion.div
							style={{ zIndex: 300 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.12, ease: 'easeOut' }}
						>
							<motion.div
								className={clsx(styles.content, className)}
								initial={{ scale: 0.95, y: side === 'top' ? 4 : -4 }}
								animate={{ scale: 1, y: 0 }}
								exit={{ scale: 0.95, y: side === 'top' ? 4 : -4 }}
								transition={{ duration: 0.12, ease: 'easeOut' }}
							>
								{children}
							</motion.div>
							{showArrow && (
								<TooltipPrimitive.Arrow
									className={styles.arrow}
									width={8}
									height={4}
								/>
							)}
						</motion.div>
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			)}
		</AnimatePresence>
	);
};
