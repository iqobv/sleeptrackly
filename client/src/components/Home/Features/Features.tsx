import { Container, Grid, GridItem, SectionHeader } from '@shared/ui';
import clsx from 'clsx';
import styles from './Features.module.scss';
import { FeaturesItem } from './FeaturesItem/FeaturesItem';
import { FEATURES_ITEMS } from './featuresItems';

export const Features = () => {
	const featured = FEATURES_ITEMS[0];
	const otherFeatures = FEATURES_ITEMS.slice(1);

	return (
		<section className={styles.features}>
			<Container>
				<SectionHeader
					title="System Capabilities"
					description="Pure data, strict validation, and disciplined progression. No unnecessary metrics."
					titleProps={{
						variant: 'h2',
						textTransform: 'uppercase',
					}}
					descriptionProps={{
						color: 'secondary',
					}}
					padding={30}
					containerClassName={styles.sectionHeader}
				/>
			</Container>
			<div className={styles.wrapper}>
				<div className={clsx(styles.row, styles.rowFeatured)}>
					<Container>
						<div className={clsx(styles.card, styles.featured)}>
							<FeaturesItem item={featured} />
						</div>
					</Container>
				</div>
				<div className={styles.row}>
					<Container>
						<Grid className={styles.grid} gap={1}>
							{otherFeatures.map((item, i) => (
								<GridItem key={i} className={styles.card}>
									<FeaturesItem item={item} />
								</GridItem>
							))}
						</Grid>
					</Container>
				</div>
			</div>
		</section>
	);
};
