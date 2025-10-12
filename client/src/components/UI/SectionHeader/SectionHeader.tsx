'use client';

import styles from './SectionHeader.module.scss';
import { SectionHeaderProps } from './SectionHeader.types';

export default function SectionHeader({
	title = '',
	description = '',
	titleComponent = 'h1',
	descriptionComponent = 'p',
	titleClassName = '',
	descriptionClassName = '',
	containerClassName = '',
	padding = 20,
}: SectionHeaderProps) {
	const Title = titleComponent;
	const Description = descriptionComponent;

	return (
		<div
			className={`${styles['section-header']} ${containerClassName}`}
			style={
				{
					'--padding': `${padding}px`,
				} as React.CSSProperties
			}
		>
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
