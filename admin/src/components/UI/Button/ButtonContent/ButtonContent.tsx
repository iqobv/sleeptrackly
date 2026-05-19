import { ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import styles from './ButtonContent.module.scss';

interface ButtonContentParams {
	children: ReactNode;
	loading: boolean;
	asChild?: boolean;
}

export const renderButtonContent = ({
	children,
	loading,
	asChild,
}: ButtonContentParams): ReactNode => {
	const contentStyle = {
		visibility: loading ? 'hidden' : 'visible',
		opacity: loading ? 0 : 1,
	} as const;

	if (asChild && isValidElement(children)) {
		const childElement = children as ReactElement<{ children?: ReactNode }>;

		return cloneElement(
			childElement,
			undefined,
			<span className={styles.content} style={contentStyle}>
				{childElement.props.children}
			</span>,
		);
	}

	return (
		<span className={styles.content} style={contentStyle}>
			{children}
		</span>
	);
};
