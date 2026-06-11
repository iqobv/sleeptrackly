import styles from './LegalContent.module.scss';

interface LegalContentProps {
	html: string;
}

export const LegalContent = ({ html }: LegalContentProps) => {
	const sanitized = html
		.replace(/<p/g, '<div')
		.replace(/<\/p>/g, '</div>')
		.replace(/\s+/g, ' ')
		.replace(/>\s+</g, '><')
		.trim();

	return (
		<section
			className={styles.legalContent}
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: sanitized }}
		/>
	);
};
