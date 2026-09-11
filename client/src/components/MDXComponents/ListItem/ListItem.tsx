import { PropsWithChildren } from 'react';
import styles from './ListItem.module.scss';

export const ListItem = ({ children }: PropsWithChildren<unknown>) => {
	return <li className={styles.item}>{children}</li>;
};
