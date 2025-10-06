'use client';

import styles from './SectionHeader.module.scss';

type Component = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface SectionHeaderProps {
	title: string;
	description?: string;
	titleComponent?: Component;
	descriptionComponent?: Component;
	containerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

export default function SectionHeader({
	title,
	description = '',
	titleComponent = 'h1',
	descriptionComponent = 'p',
	titleClassName = '',
	descriptionClassName = '',
	containerClassName = '',
}: SectionHeaderProps) {
	const Title = titleComponent;
	const Description = descriptionComponent;

	return (
		<div className={`${styles['section-header']} ${containerClassName}`}>
			<Title className={`${styles['section-header__title']} ${titleClassName}`}>
				{title}
			</Title>
			{!!description && (
				<Description
					className={`${styles['section-header__description']} ${descriptionClassName}`}
				>
					{description}
				</Description>
			)}
		</div>
	);
}
