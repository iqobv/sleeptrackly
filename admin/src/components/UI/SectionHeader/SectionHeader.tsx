'use client';

import clsx from 'clsx';
import { BackButton } from '../BackButton/BackButton';
import styles from './SectionHeader.module.scss';
import { SectionHeaderProps } from './SectionHeader.types';

interface CustomCSSProperties extends React.CSSProperties {
	'--padding': string;
	'--gap'?: string;
}

export const SectionHeader = ({
	title = '',
	description = '',
	titleComponent = 'h1',
	descriptionComponent = 'p',
	titleClassName = '',
	descriptionClassName = '',
	containerClassName = '',
	padding = 20,
	gap = 10,
	showBackButton = false,
	onBackButtonClick,
}: SectionHeaderProps) => {
	const Title = titleComponent;
	const Description = descriptionComponent;

	const style: CustomCSSProperties = {
		'--padding': `${padding}px`,
	};

	if (description) style['--gap'] = `${gap}px`;

	return (
		<div
			className={clsx(styles.header, containerClassName)}
			style={
				{
					'--padding': `${padding}px`,
					'--gap': `${gap}px`,
				} as React.CSSProperties
			}
		>
			{showBackButton && onBackButtonClick && (
				<BackButton onBack={onBackButtonClick} />
			)}
			<div className={styles.content}>
				<Title className={clsx(styles.title, titleClassName)}>{title}</Title>
				{!!description && (
					<Description
						className={clsx(styles.description, descriptionClassName)}
					>
						{description}
					</Description>
				)}
			</div>
		</div>
	);
};
