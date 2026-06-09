'use client';

import clsx from 'clsx';
import { ModalPartProps } from './ModalPart.types';
import styles from './ModalParts.module.scss';

export const ModalBody = ({ children, className }: ModalPartProps) => {
	return <div className={clsx(styles.body, className)}>{children}</div>;
};
