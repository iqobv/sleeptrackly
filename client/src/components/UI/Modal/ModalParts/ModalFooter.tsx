'use client';

import { ModalPartProps } from './ModalPart.types';
import styles from './ModalParts.module.scss';

const ModalFooter = ({ children, className }: ModalPartProps) => {
	return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

export default ModalFooter;
