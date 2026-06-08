import { Button, List, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import styles from './CustomizationLinks.module.scss';
import { CUSTOMIZATION_LINKS } from './customizationLinksItems';

export const CustomizationLinks = () => {
	return (
		<div className={`page ${styles.container}`}>
			<SectionHeader title="Customization" />
			<List
				items={CUSTOMIZATION_LINKS}
				renderItem={({ href, label }) => (
					<Button asChild variant="link" key={href}>
						<Link href={href}>{label}</Link>
					</Button>
				)}
			></List>
		</div>
	);
};
