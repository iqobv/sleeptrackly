'use client';

import { ModalPartProps } from './ModalPart.types';
import styles from './ModalParts.module.scss';

const ModalBody = ({ children, className }: ModalPartProps) => {
	return <div className={`${styles.body} ${className}`}>{children}</div>;
};

export default ModalBody;
