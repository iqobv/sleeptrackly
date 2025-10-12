type Component = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export interface SectionHeaderProps {
	title?: string;
	description?: string;
	titleComponent?: Component;
	descriptionComponent?: Component;
	containerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	padding?: number;
}
