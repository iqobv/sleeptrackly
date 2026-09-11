import clsx from 'clsx';
import { PageHeader } from '../PageHeader/PageHeader';
import styles from './PageWrapper.module.scss';
import { PageWrapperProps } from './PageWrapper.types';

export const PageWrapper = ({
	children,
	style,
	className,
	title,
	description,
	showBackButton = true,
	sectionHeaderProps,
	...props
}: PageWrapperProps) => {
	return (
		<div className={clsx(styles.pageWrapper, className)} style={style}>
			<PageHeader
				title={title}
				description={description}
				showBackButton={showBackButton}
				sectionHeaderProps={sectionHeaderProps}
				{...props}
			/>
			{children}
		</div>
	);
};
