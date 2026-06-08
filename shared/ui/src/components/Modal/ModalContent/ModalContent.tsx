'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useModalContext } from '../ModalContext';
import styles from './ModalContent.module.scss';

interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
	description?: React.ReactNode;
}

export const ModalContent = ({
	children,
	className = '',
	description = 'Modal content',
}: ModalContentProps) => {
	const { isOpen } = useModalContext();

	return (
		<AnimatePresence>
			{isOpen && (
				<Dialog.Portal forceMount>
					<Dialog.Overlay asChild forceMount>
						<motion.div
							className={styles.overlay}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						/>
					</Dialog.Overlay>
					<Dialog.Content asChild forceMount>
						<motion.div
							className={`${styles.content} ${className}`}
							initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
							animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
							exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
							transition={{ type: 'spring', duration: 0.3 }}
						>
							<Dialog.Description className={styles.visuallyHidden}>
								{description}
							</Dialog.Description>
							{children}
						</motion.div>
					</Dialog.Content>
				</Dialog.Portal>
			)}
		</AnimatePresence>
	);
};
