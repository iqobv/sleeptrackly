import styles from './SectionHeader.module.scss';
import { SectionHeaderProps } from './SectionHeader.types';

interface CustomCSSProperties extends React.CSSProperties {
	'--padding': string;
	'--gap'?: string;
}

export default function SectionHeader({
	title = '',
	description = '',
	titleComponent = 'h1',
	descriptionComponent = 'p',
	titleClassName = '',
	descriptionClassName = '',
	containerClassName = '',
	padding = 20,
	gap = 10,
}: SectionHeaderProps) {
	const Title = titleComponent;
	const Description = descriptionComponent;

	const style: CustomCSSProperties = {
		'--padding': `${padding}px`,
	};

	if (description) style['--gap'] = `${gap}px`;

	return (
		<div
			className={`${styles['section-header']} ${containerClassName}`}
			style={
				{
					'--padding': `${padding}px`,
					'--gap': `${gap}px`,
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
