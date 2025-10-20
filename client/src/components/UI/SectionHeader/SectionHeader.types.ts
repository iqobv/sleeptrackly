type Component = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export interface SectionHeaderProps {
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	titleComponent?: Component;
	descriptionComponent?: Component;
	containerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	padding?: number;
	gap?: number;
}
