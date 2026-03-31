import styles from './LegalContent.module.scss';

interface LegalContentProps {
	html: string;
}

export function LegalContent({ html }: LegalContentProps) {
	const sanitized = html
		.replace(/<p/g, '<div')
		.replace(/<\/p>/g, '</div>')
		.replace(/\s+/g, ' ')
		.replace(/>\s+</g, '><')
		.trim();

	return (
		<section
			className={styles['legal-content']}
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: sanitized }}
		/>
	);
}
