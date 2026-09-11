import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import styles from './AddButton.module.scss';
import { CreateButtonProps } from './AddButton.types';

export const AddButton = ({
	children,
	href,
	customIcon,
	ref,
	...props
}: CreateButtonProps) => {
	const Icon = customIcon || MdAdd;

	return (
		<Link href={href} className={styles.content} ref={ref} {...props}>
			<Icon size={24} />
			<span className={styles.text}>{children}</span>
		</Link>
	);
};
