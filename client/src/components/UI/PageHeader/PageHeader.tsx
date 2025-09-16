'use client';

import styles from './PageHeader.module.scss';

type Component = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface PageHeaderProps {
	title: string;
	description?: string;
	titleComponent?: Component;
	descriptionComponent?: Component;
	containerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

export default function PageHeader({
	title,
	description = '',
	titleComponent = 'h1',
	descriptionComponent = 'p',
	titleClassName = '',
	descriptionClassName = '',
	containerClassName = '',
}: PageHeaderProps) {
	const Title = titleComponent;
	const Description = descriptionComponent;

	return (
		<div className={`${styles['page-header']} ${containerClassName}`}>
			<Title className={`${styles['page-header__title']} ${titleClassName}`}>
				{title}
			</Title>
			{!!description && (
				<Description
					className={`${styles['page-header__description']} ${descriptionClassName}`}
				>
					{description}
				</Description>
			)}
		</div>
	);
}
