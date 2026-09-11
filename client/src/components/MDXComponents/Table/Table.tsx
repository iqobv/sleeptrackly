import { PropsWithChildren } from 'react';
import styles from './Table.module.scss';

export const Table = ({ children }: PropsWithChildren<unknown>) => {
	return <table className={styles.table}>{children}</table>;
};
