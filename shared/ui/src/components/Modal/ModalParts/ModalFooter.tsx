'use client';

import clsx from 'clsx';
import { ModalPartProps } from './ModalPart.types';
import styles from './ModalParts.module.scss';

export const ModalFooter = ({ children, className }: ModalPartProps) => {
	return <div className={clsx(styles.footer, className)}>{children}</div>;
};
